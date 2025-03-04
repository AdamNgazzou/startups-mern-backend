  import { auth } from "@/auth";
  import { redirect } from "next/navigation";

  import StartupForm from "@/components/StartupForm";

  const Page = async () =>{
    const session = await auth();
    console.log(session?.user?.id);
    if(!session) redirect("/"); // AYO DATS SECURITY ^^
    return (
      <>
        <section className="pink_container !min-h-[230px]">
          <h1 className="heading">submit your Startup</h1>
        </section>
        <StartupForm UserId={session?.user?.id}/>
      </>
    );
  }

  export default Page;
