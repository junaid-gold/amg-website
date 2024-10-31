import { redirect } from "next/navigation";
import Form from "./_components/form";
import getServerAuthSession from "@/lib/auth";

const page = async () => {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center w-full flex-1 justify-center  ">
      <div className="max-w-[712px] w-full flex-1 flex flex-col items-center justify-center">
        <Form />
      </div>
    </div>
  );
};

export default page;
