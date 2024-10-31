import client from "@/sanity/client";
import { aboutHighlightsDataQuery } from "@/sanity/query";
import { AboutHighlightsType } from "@/types";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import Image from "next/image";
import React from "react";

export const revalidate = 0


const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-theme-black lg:text-left text-center text-[64px] lg:text-[55px] xl:text-[96px] leading-[0.9em] font-theme-font-medium">
        {children}
      </h1>
    ),
    normal: ({ children }) => (
      <p className="text-base text-gray-700">{children}</p>
    ),
  },
  marks: {
    color: ({ children, value }) => (
      <span
        className="lg:text-left text-center text-[64px] lg:text-[55px] xl:text-[96px] leading-[0.9em] font-theme-font-medium"
        style={{ color: value?.hex }}
      >
        {children}
      </span>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href} // Link URL
        target={value?.target || '_self'} // Target (open in same or new tab)
        rel={value?.target === '_blank' ? 'noopener noreferrer' : undefined} // Security for new tab
        className="text-blue-500 underline hover:text-blue-700"
      >
        {children}
      </a>)
  },
};

const AboutHighlights = async () => {
  const aboutHighlightsData: AboutHighlightsType[] = await client.fetch(
    aboutHighlightsDataQuery
  );
  return aboutHighlightsData.map((about, key) => (
    <div
      key={key}
      className={`px-10 max-w-[90rem] py-10 sm:py-16 ${key === 0 ? "-mt-20" : ""} justify-center items-center flex flex-col ${key % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"} gap-4 xl:gap-8`}
    >
      <div className={"flex flex-col gap-4 w-full md:w-1/2"}>
        <h1
          className={`text-[24px] lg:text-[48px] leading-[1em] font-theme-font-medium`}
        >
          {about.heading}
        </h1>
        {/* <p className={"text-base lg:text-[24px] font-theme-font-light"}>
          {about.text}
        </p> */}

        <PortableText components={components} value={about?.text} />
      </div>
      <Image
        src={about?.image}
        alt={"about"}
        width={700}
        height={700}
        className={"w-full md:!w-1/2 rounded-[34px]"}
      />
    </div>
  ));
};

export default AboutHighlights;
