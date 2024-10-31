"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter()
  const session = useSession();
  if (session?.data?.user) {
    signOut({ callbackUrl: "/sign-in" });
  } else {
    // router.push("/sign-in");
  }
  return <div></div>;
};

export default Page;
