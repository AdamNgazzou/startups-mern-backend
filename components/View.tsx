import Ping from "@/components/Ping";
import { formatNumber } from "@/lib/utils";


const View = async ({ id }: { id: string }) => {
  // Fetch total views

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'; 

  // Increment the view count by 1
  const startups = await fetch(`${baseUrl}/api/startups/user/${id}`);
  const rawResponse_Startups = await startups.json();
  console.log("hehe",rawResponse_Startups);

  rawResponse_Startups.startup.views = rawResponse_Startups.startup.views + 1;
  const req = await fetch(`${baseUrl}/api/startups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawResponse_Startups.startup),
  });
  console.log("views",rawResponse_Startups.startup.views);
  // Perform the update

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{formatNumber(rawResponse_Startups.startup.views)}</span> views
      </p>
    </div>
  );
};

export default View;