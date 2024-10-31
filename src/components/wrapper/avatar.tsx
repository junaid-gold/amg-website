import { useQuery } from "@tanstack/react-query";
import React from "react";
import { currentCustomer } from "./actions";
import Link from "next/link";

const Avatar = () => {
  const { isPending, data } = useQuery({
    queryFn: currentCustomer,
    queryKey: ["currentCustomer"],
  });

  return (
    <Link
      href={"/account"}
      className={
        "flex items-center text-sm lg:text-base justify-center w-[36px] h-[36px] lg:w-12 lg:h-12 border border-[#252422] bg-[#FBF796] rounded-full"
      }
    >
      {!isPending ? (
        <p className={"mt-[2px]"}>
          {data?.data?.firstname.slice(0, 1)}
          {data?.data?.lastname.slice(0, 1)}
        </p>
      ) :
        <span className="animate-ping inline-flex h-3 w-3 rounded-full bg-black opacity-50"></span>}
    </Link>
  );
};

export default Avatar;
