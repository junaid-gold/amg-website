import FooterComponent from "@/components/common/footer.component";
import client from "@/sanity/client";
import { gradingScaleDataQuery, gradingScaleModuleDataQuery } from "@/sanity/query";
import { GradingScaleModuleType, GradingScalePageType } from "@/types";
import { PortableText, PortableTextReactComponents } from "next-sanity";

export const revalidate = 0

const components: Partial<PortableTextReactComponents> = {
    block: {
        h1: ({ children }) => (
            <h1 className={
                "font-theme-font-light text-[18px] "} >
                {children}
            </h1>
        ),
        normal: ({ children }) => (
            <p
                className={
                    "font-theme-font-light text-[18px] "
                }
            >{children}</p>
        )
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
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc ml-6">{children}</ul> // Apply disc style with left margin
        ),
        number: ({ children }) => (
            <ol className="list-decimal ml-6">{children}</ol> // Apply numbered list with left margin
        ),
    },
    listItem: {
        bullet: ({ children }) => (
            <li className="font-theme-font-light text-[18px] ">{children}</li> // Bullet list items
        ),
        number: ({ children }) => (
            <li className="font-theme-font-light text-[18px] ">{children}</li> // Numbered list items
        ),
    },
};


const Page = async () => {
    const tocData: GradingScalePageType = await client.fetch(gradingScaleDataQuery);
    const modules: GradingScaleModuleType[] = await client.fetch(gradingScaleModuleDataQuery);
    return (

        <>
            <div
                className={
                    "flex flex-col flex-1  pt-[36px] xl:pt-0 md:pt-[15px] pb-[120px]"
                }
            >
                <div className="px-[26px] md:px-0 flex flex-col w-full">
                    <div className="text-[34px] md:text-[54px] xl:text-[64px] text-[#030303] leading-[110%] md:leading-[120%] tracking-[0.68px] md:tracking-[-1.08px] xl:tracking-[-1.28px] py-[24px] md:py-[32px] xl:py-[104px] px-[26px] bg-[#EBEAE2] flex items-center justify-center font-theme-font-medium">
                        Grading Scale
                    </div>
                </div>

                <div className="text-[#100F0F] flex flex-col mt-[45px] md:mt-[30px] xl:mt-[76px] px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] gap-y-[40px] mx-auto max-w-[1050px]">
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">AMG GRADING SCALE:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.amgGradingScale} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">VINYL:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.vinyl} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">CASSETTES, CDs & 8-TRACKS:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.cassettesCdsAndTracks} />
                        </div>
                    </div>
                </div>
                <div className="mt-[45px] md:mt-[30px] xl:mt-[76px] px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] gap-y-[40px] mx-auto max-w-[1050px] w-full">

                    <div className="relative w-full">
                        <div
                            className="border border-[#F2F1F1] border-r-0 lg:border-theme-gray flex gap-2 overflow-x-auto w-full"
                        >
                            <div className={"xl:w-full"}>
                                {/* Header */}
                                <div className="bg-white w-full justify-start items-start flex">
                                    <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray max-w-[150px] p-6 justify-start items-center gap-2 flex">
                                        <div className="text-theme-black text-[18px] lg:text-[24px] text-center font-theme-font-medium leading-[21px]">
                                            Overall Grade
                                        </div>
                                    </div>
                                    <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray max-w-[130px] p-6 justify-start items-center gap-2 flex">
                                        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium text-center leading-[21px]">
                                            Numeric Grade
                                        </div>
                                    </div>
                                    <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] justify-start items-center gap-2 flex">
                                        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                                            Description
                                        </div>
                                    </div>
                                    <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-center gap-2 flex">
                                        <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-medium leading-[21px]">
                                            Example
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                {
                                    modules.map((value, index) => (
                                        <div
                                            key={index}

                                            className={`${index % 2 === 1 ? "bg-theme-gray" : "bg-white"} w-full justify-start items-start flex`}
                                        >
                                            <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray max-w-[150px] justify-center items-start gap-2 flex">
                                                <div className="text-theme-black text-[18px] lg:text-[24px] text-center font-theme-font-light leading-[21px]">
                                                    {value?.overallGrade}
                                                </div>
                                            </div>
                                            <div className="w-full border-r border-r-[#F2F1F1] lg:border-r-theme-gray max-w-[130px] p-6 justify-center items-start gap-2 flex">
                                                <div className="text-theme-black text-[18px] lg:text-[24px] text-center font-theme-font-light leading-[21px]">
                                                    {value?.numericGrade}
                                                </div>
                                            </div><div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[250px] justify-start items-center gap-2 flex">
                                                <div className="text-theme-black text-[18px] lg:text-[24px] overflow-hidden text-ellipsis font-theme-font-light leading-[24px] break-words">
                                                    <PortableText components={components} value={value?.description} />
                                                </div>
                                            </div>

                                            <div className="w-full p-6 border-r border-r-[#F2F1F1] lg:border-r-theme-gray min-w-[150px] justify-start items-start gap-2 flex">
                                                <div className="text-theme-black text-[18px] lg:text-[24px] font-theme-font-light leading-[21px]">
                                                    <PortableText components={components} value={value?.examples} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default Page