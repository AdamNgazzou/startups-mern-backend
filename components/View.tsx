import Ping from "@/components/Ping";
import { formatNumber } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
  // Fetch total views
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  
  // Increment the view count by 1
  const updatedViews = totalViews + 1;
  const  x  = "67bb868b539f5dcbe782507e";
  const startups = await fetch(`http://localhost:3000/api/startups/user/${x}`);
  const rawResponse_Startups = await startups.json();
  console.log("hehe",rawResponse_Startups);
  rawResponse_Startups.views = rawResponse_Startups.views + 1;
  const req = await fetch(`http://localhost:3000/api/startups/${x}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rawResponse_Startups),
  });
  console.log(rawResponse_Startups.views);
  // Perform the update
  await writeClient
    .patch(id)
    .set({ views: updatedViews })
    .commit();

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>

      <p className="view-text">
        <span className="font-black">{formatNumber(updatedViews)}</span> views
      </p>
    </div>
  );
};

export default View;