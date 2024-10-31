import Tabs from "./_components/tabs";
import getServerAuthSession from "@/lib/auth";
import { redirect } from "next/navigation";
import { getProductType } from "../media-submission/actions";

const Page = async () => {

  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  const [productType] = await Promise.all([getProductType()]);
  return (
    <Tabs
      data={productType}
    />
  );
};

export default Page;
