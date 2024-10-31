import { redirect } from "next/navigation";
import getServerAuthSession from "@/lib/auth";
import Form from "./_components/form";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const resetToken = searchParams?.token;
  if (!resetToken) {
    redirect("/forgot-password");
  }
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex flex-col items-center w-full flex-1 justify-center  ">
      <div className="max-w-[712px] w-full flex-1 flex flex-col items-center justify-center">
        <Form resetToken={resetToken as string} />
      </div>
    </div>
  );
};

export default page;
