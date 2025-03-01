import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";

import StartupCard, { StartupCardType } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const posts = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id: id });

  // startups of author fetch
  const startups = await fetch(`http://localhost:3000/api/startups/user/?github_id=${id}`);
  const rawResponse_Startups = await startups.json();
  console.log(rawResponse_Startups);
  return (
    <>
      {posts.length > 0 ? (
        posts.map((post: StartupCardType) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
