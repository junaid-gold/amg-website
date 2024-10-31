import getServerAuthSession from "@/lib/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await getServerAuthSession();
  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="flex-1 flex items-center justify-center flex-col">
      {children}
    </div>
  );
};

export default layout;
