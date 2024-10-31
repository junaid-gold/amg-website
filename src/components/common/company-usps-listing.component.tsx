import client from "@/sanity/client";
import { whyGradeDataQuery } from "@/sanity/query";
import { WhyGradeType } from "@/types";
import Image from "next/image";

const CompanyUSPComponent = async () => {
  const whyGradeData: WhyGradeType[] = await client.fetch(whyGradeDataQuery);
  return (
    <div
      className={
        "flex flex-wrap items-start justify-center gap-8 sm:gap-4 xl:gap-8"
      }
    >
      {whyGradeData.map((value) => (
        <div
          key={value.heading}
          className={
            "flex flex-col w-full sm:w-[48%] xl:w-[23%] items-center justify-center gap-8"
          }
        >
          <Image
            src={value?.image}
            alt={value?.heading}
            width={64}
            height={64}
          />
          <p className={"font-theme-font-bold text-xl text-center"}>
            {value.heading}
          </p>
          <p className={"-mt-5 text-center font-[14px] font-theme-font-light"}>
            {value.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CompanyUSPComponent;
