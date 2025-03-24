import Image from "next/image";
import { Suspense } from "react";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  //fetching mongodb
  //to change make it id when you make the user get all the data from mongodb


  //authors fetch
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const author = await fetch(`${baseUrl}/api/authors/user/${id}`);
  const rawResponse_author = await author.json();
  console.log("hey",rawResponse_author);
  
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {rawResponse_author.name}
            </h3>
          </div>

          <Image
            src={rawResponse_author.image}
            alt="user_image"
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{rawResponse_author?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{rawResponse_author?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {rawResponse_author?.id === id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
}

export default Page;
