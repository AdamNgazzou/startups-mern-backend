import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard from "@/components/StartupCard";

const md = markdownit({ linkify: true });;

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'; 
  const startups = await fetch(`${baseUrl}/api/startups/user/${id}`);
  const rawResponse_Startups = await startups.json();
  console.log("test",rawResponse_Startups?.startup?.pitch);

  const parsedContent = md.render(rawResponse_Startups?.startup?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(rawResponse_Startups?.startup?._createdAt)}</p>

        <h1 className="heading">{rawResponse_Startups?.startup?.title}</h1>
        <p className="sub-heading !max-w-5xl">{rawResponse_Startups.startup.description}</p>
      </section>

      <section className="section_container">
        <img
          src={rawResponse_Startups.startup.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${rawResponse_Startups?.author?.id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={rawResponse_Startups?.author?.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{rawResponse_Startups?.author?.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{rawResponse_Startups?.author?.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{rawResponse_Startups?.startup?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {rawResponse_Startups?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {rawResponse_Startups.map((post: any, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;