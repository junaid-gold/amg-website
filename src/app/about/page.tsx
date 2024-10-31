import { AboutType } from "@/types";
import client from "@/sanity/client";
import { aboutDataQuery } from "@/sanity/query";
import AboutHighlights from "@/components/about-highlights";
import WhyUseAmg from "@/components/why-use-amg";
import FooterComponent from "@/components/common/footer.component";
import Header from "./header";

export const revalidate = 0
const About = async () => {
  const aboutData: AboutType = await client.fetch(aboutDataQuery);
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <Header
          heading={aboutData?.heading}
          backgroundImage={aboutData?.aboutHero?.backgroundImage}
          backgroundImageSm={aboutData?.aboutHero?.backgroundImageSm}
        />
        <AboutHighlights />
        <div
          className={
            "bg-theme-gray items-center w-full justify-center flex mt-7 lg:mt-0 px-10 py-16"
          }
        >
          <div
            className={
              "max-w-[90rem] flex flex-col items-center justify-center"
            }
          >
            <h1
              className={
                "text-theme-black text-[48px] leading-[1em] mb-16 font-theme-font-medium hidden sm:block"
              }
            >
              Why Use AMG
            </h1>
            <WhyUseAmg />
          </div>
        </div>
      </div>

      <FooterComponent />
    </>
  );
};

export default About;
