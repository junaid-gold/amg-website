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
                    "flex flex-col flex-1  pt-[36px] xl:pt-0 md:pt-[15px]"
                }
            >
                <div className="px-[26px] md:px-0 flex flex-col w-full">
                    <div className="py-[24px]  md:py-[32px] xl:py-[104px] px-[26px] bg-[#EBEAE2]  ">
                        <div className="mx-auto max-w-[1050px] md:px-[50px] space-y-4">
                            <div className="text-[34px] text-center md:text-[54px] xl:text-[64px] font-theme-font-medium text-[#030303] leading-[110%] md:leading-[120%] tracking-[0.68px] md:tracking-[-1.08px] xl:tracking-[-1.28px] ">
                                Grading Scale
                            </div>
                            <p className="text-center">
                                <PortableText components={components} value={tocData?.amgGradingScale} />
                            </p>
                            <div className="flex items-center justify-center w-full">
                                <button className="border border-[#252422] rounded-full font-semibold text-lg py-4 max-w-80 w-full">See the scale</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-[#100F0F] flex flex-col px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] gap-y-[40px] mx-auto max-w-[1050px]">


                    {/* Section */}
                    <div className="py-10 md:py-20">
                        <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                            <div className="max-w-[648px] mx-auto">
                                <div className="font-theme-font-bold text-center mb-6 text-3xl">For open and loose vinyl – AMG looks at four components for each submitted open item:</div>
                            </div>
                            <div className="grid gap-6 my-6 sm:grid-cols-2 md:grid-cols-4">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-[#E0DFD5] font-semibold text-[80px] leading-[80px]">01</h1>
                                    <h4 className="text-[#252422] font-semibold text-xl">The Record</h4>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-[#E0DFD5] font-semibold text-[80px] leading-[80px]">02</h1>
                                    <h4 className="text-[#252422] font-semibold text-xl">Record Labels</h4>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-[#E0DFD5] font-semibold text-[80px] leading-[80px]">03</h1>
                                    <h4 className="text-[#252422] font-semibold text-xl">The Cover</h4>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="text-[#E0DFD5] font-semibold text-[80px] leading-[80px]">04</h1>
                                    <h4 className="text-[#252422] font-semibold text-xl">Shrink Wrap</h4>
                                </div>
                            </div>
                            <div className="font-theme-font-light">
                                <PortableText components={components} value={tocData?.vinyl} />
                            </div>
                        </div>
                    </div>

                    {/* Section */}
                    <div className="pb-10 md:pb-20">
                        <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                            <div className="font-theme-font-bold text-center mb-6 text-3xl">CASSETTES, CDs & 8-TRACKS</div>
                            <div className="font-theme-font-light">
                                <PortableText components={components} value={tocData?.cassettesCdsAndTracks} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#252422] border-b px-4 py-10 md:py-20 md:px-8">
                    <div className="mx-auto max-w-[1050px] md:px-[50px] w-full">
                        <ul className="space-y-8">
                            {modules.map((value, index) => (
                                <li key={index} className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                                    <div className="border-4 min-w-56 md:min-w-60 border-[#F4F0ED] rounded-xl pt-6 ">
                                        <h1 className="text-[#F4F0ED] text-center font-semibold text-[96px]">{value?.numericGrade}</h1>
                                        <p className="bg-[#F4F0ED] mt-4 text-center font-semibold text-lg text-[#252422] w-full">{value?.overallGrade}</p>
                                    </div>
                                    <div className="text-[#F4F0ED]">
                                        <h1 className="font-semibold text-3xl">{value?.overallGrade}</h1>
                                        <PortableText components={components} value={value?.description} />
                                        <PortableText components={components} value={value?.examples} />
                                    </div>
                                </li>))}
                        </ul>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default Page