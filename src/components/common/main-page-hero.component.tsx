import Image from "next/image";
import { PlusIcon } from "@/components/icons";
import Link from "next/link";
import { HeroType, HomeType } from "@/types";
import client from "@/sanity/client";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import {
  heroFourDataQuery,
  heroOneDataQuery,
  heroThreeDataQuery,
  heroTwoDataQuery,
} from "@/sanity/query";

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
  },
};

const MainPageHeroComponent = async ({ hero }: { hero: HomeType["hero"] }) => {
  const heroData: HeroType = await client.fetch(
    (hero === "heroSectionOne" && heroOneDataQuery) ||
    (hero === "heroSectionTwo" && heroTwoDataQuery) ||
    (hero === "heroSectionThree" && heroThreeDataQuery) ||
    (hero === "heroSectionFour" && heroFourDataQuery) ||
    heroOneDataQuery
  );
  return (
    <div
      className={`flex flex-col items-center justify-center lg:flex-row py-16  max-w-[90rem] ${(hero === "heroSectionOne" || hero === "heroSectionTwo") && "px-8"}`}
    >
      <div
        className={`w-full md:w-2/3 xl:w-1/2 flex flex-col ${(hero === "heroSectionThree" || hero === "heroSectionFour") && "px-8"} px-8`}
      >
        <PortableText components={components} value={heroData?.heading} />
        <p
          className={
            "text-lg text-center lg:text-start font-theme-font-light mt-7"
          }
        >
          {heroData?.text}
        </p>
        <Link
          href={"/single-page-form"}
          className={
            "w-full mt-7 mb-20 lg:mb-0 lg:mt-[59px] lg:w-1/2 flex gap-2 items-center justify-center rounded-full border border-[#252422] text-white bg-[#252422] px-4 py-2.5"
          }
        >
          <PlusIcon stroke={"#fff"} />
          <p className={"font-theme-font-roman"}>Start submission</p>
        </Link>
      </div>

      <Image
        src={heroData?.backgroundImage}
        alt={"hero-1"}
        width={787.023}
        height={694.812}
        className={"!w-full md:!w-4/5 lg:!w-1/2"}
      />
    </div>
  );
};

export default MainPageHeroComponent;
