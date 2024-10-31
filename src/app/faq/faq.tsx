"use client";
import React, { useState } from "react";
import AccordionComponent from "./accordion.component";
import { FaqType } from "@/types";

const Faq = ({ data }: { data: FaqType }) => {
  const [accordion, setAccordion] = useState<string>("");

  return (
    <div
      className={
        "p-10 lg:p-14 bg-[#252422] flex flex-col gap-6 rounded-3xl w-full"
      }
    >
      <h1
        className={`text-[36px] lg:text-[48px] leading-[1em] text-white font-theme-font-medium`}
      >
        {data?.heading}
      </h1>
      <p
        className={
          "text-white text-[20px] lg:text-[24px] font-theme-font-light"
        }
      >
        {data?.text}
      </p>
      <div className={"w-full"}>
        {data?.questions?.map((value) => (
          <AccordionComponent
            key={value?.question}
            accordion={accordion}
            setAccordion={setAccordion}
            question={value?.question}
            answer={value?.answer}
          />
        ))}
      </div>
    </div>
  );
};

export default Faq;
