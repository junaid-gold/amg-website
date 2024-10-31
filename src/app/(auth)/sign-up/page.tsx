import React from "react";
import Form from "./_components/form";
import { getAttributes, getCountries } from "./actions";
import { Attribute, Country } from "@/types";

const page = async () => {
  const [countries, attribute]: [Country[], Attribute] = await Promise.all([
    getCountries(),
    getAttributes(),
  ]);

  return (
    <div className="flex flex-col items-center w-full flex-1 justify-center  ">
      <div className="max-w-[712px] w-full flex-1 flex flex-col items-center justify-center">
        <Form countries={countries} attributeDetails={attribute} />
      </div>
    </div>
  );
};

export default page;
