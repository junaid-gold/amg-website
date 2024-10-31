import React from "react";
import { PlusWhiteIcon } from "@/components/icons";
import { beforeYouSendData } from "@/data/help.data";

const AccordionComponent = ({
  setAccordion,
  accordion,
  question,
  answer,
}: {
  setAccordion: any;
  accordion: string;
  question: string;
  answer: string;
}) => {
  return (
    <div className={"w-full"}>
      <button
        onClick={() => setAccordion(question === accordion ? "" : question)}
        className={
          "flex w-full justify-between items-center py-5 border-b border-b-[#E5E7EB]"
        }
      >
        <p className={"text-[18px] text-white font-theme-font-medium"}>
          {question}
        </p>
        <PlusWhiteIcon />
      </button>
      <p
        className={`text-[16px] expandable-content ${accordion === question ? "open" : ""} text-white font-theme-font-light mt-4`}
      >
        {answer}
      </p>
    </div>
  );
};

export default AccordionComponent;
