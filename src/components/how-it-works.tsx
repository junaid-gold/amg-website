import React from "react";
import HowItWorkItem from "./how-it-work-item";
import client from "@/sanity/client";
import { howItWorksDataQuery } from "@/sanity/query";
import { HowItWorkType } from "@/types";

const HowItWorks = async () => {
  const howItWorksData: HowItWorkType[] =
    await client.fetch(howItWorksDataQuery);
  return howItWorksData?.map((howItWork, index) => (
    <HowItWorkItem
      key={howItWork?.heading}
      data={{ ...howItWork, index: index + 1 }}
    />
  ));
};

export default HowItWorks;
