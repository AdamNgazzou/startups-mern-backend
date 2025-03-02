
import StartupCard, { StartupCardType } from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {

  // startups of author fetch
  const startups = await fetch(`http://localhost:3000/api/startups/user/?github_id=${id}`);
  const rawResponse_Startups = await startups.json();
  console.log(rawResponse_Startups);
  return (
    <>
      {rawResponse_Startups.length > 0 ? (
        rawResponse_Startups.map((post: StartupCardType) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
