import client from "@/sanity/client";
import { whatWeArchiveDataQuery } from "@/sanity/query";
import { WhatWeArchiveType } from "@/types";
import { isEmpty } from "lodash";
import React from "react";

const WhatWeArchive = async () => {
  const whatWeArchiveData: WhatWeArchiveType[] = await client.fetch(
    whatWeArchiveDataQuery
  );
  return (
    <div className="flex flex-wrap justify-between gap-6 mt-5">
      {whatWeArchiveData?.map((hightLight, key) => (
        <div
          key={hightLight.heading}
          style={{ backgroundColor: hightLight?.backgroundColor }}
          className={`p-12 overflow-hidden flex flex-col justify-between relative h-auto sm:h-[570px] w-full sm:w-[48%] rounded-3xl ${hightLight.backgroundColor !== "#252422" ? "text-theme-black" : "text-white"}`}
        >
          <div className="flex flex-col gap-4 flex-grow">
            <h1 className="text-[36px] break-all md:text-[42px] lg:mt-[75px] leading-[1em] font-theme-font-medium">
              {hightLight.heading}
            </h1>
            <p className="font-theme-font-roman text-[20px] md:text-[24px] mt-2">
              {hightLight.text}
            </p>
            {!isEmpty(hightLight.description) && (
              <p className="font-theme-font-light-italic text-base mt-2">
                {hightLight.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhatWeArchive;
