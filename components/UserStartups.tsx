
import StartupCard from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {

  // startups of author fetch
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const startups = await fetch(`${baseUrl}/api/startups/user/?github_id=${id}`);
  const rawResponse_Startups = await startups.json();
  console.log(rawResponse_Startups);
  return (
    <>
      {rawResponse_Startups.length > 0 ? (
        rawResponse_Startups.map((post: any) => (
          <StartupCard key={post._id} post={post} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserStartups;
