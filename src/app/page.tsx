import React from "react";
import CompanyUSPComponent from "@/components/common/company-usps-listing.component";
import TypeCassetteComponent from "@/components/common/types-cassette.component";
import MainPageHeroComponent from "@/components/common/main-page-hero.component";
import { HomeType } from "@/types";
import client from "@/sanity/client";
import { homeDataQuery } from "@/sanity/query";
import HowItWorks from "@/components/how-it-works";
import FollowAmg from "@/components/follow-amg";
import FooterComponent from "@/components/common/footer.component";

export const revalidate = 0

export default async function Home() {
  const homeData: HomeType = await client.fetch(homeDataQuery);
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <MainPageHeroComponent hero={homeData?.hero} />
        <div
          className={
            "flex max-w-[90rem] flex-col items-center justify-center py-10 px-7 lg:px-14"
          }
        >
          <h1
            className={
              "text-theme-black !text-[36px] lg:text-[64px] leading-[1em] mb-16 font-theme-font-medium"
            }
          >
            Why Grade?
          </h1>
          <CompanyUSPComponent />
        </div>
        <TypeCassetteComponent />
        <div
          className={
            "max-w-[90rem] flex flex-col items-center lg:items-start w-full -mt-16 lg:mt-0 justify-center pb-20 pt-10 md:pt-0 px-7 lg:px-14"
          }
        >
          <h1
            className={
              "text-theme-black !text-[36px] lg:text-[64px] leading-[1em] mb-16 font-theme-font-medium"
            }
          >
            How it works
          </h1>
          <div
            className={
              "flex flex-wrap items-center justify-center lg:flex-row gap-[24px]"
            }
          >
            <HowItWorks />
          </div>
        </div>
        <FollowAmg />
        <div className={"bg-theme-gray h-px w-full"} />
      </div>
      <FooterComponent />
    </>
  );
}
