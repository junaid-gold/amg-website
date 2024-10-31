import FooterComponent from "@/components/common/footer.component"
import client from "@/sanity/client";
import { aboutDataQuery, tocDataQuery } from "@/sanity/query";
import { TermsConditionPageType } from "@/types";
import { PortableText, PortableTextReactComponents } from "next-sanity";
import React from "react"

export const revalidate = 0

const components: Partial<PortableTextReactComponents> = {
    block: {
        h1: ({ children }) => (
            <h1 className="text-theme-black lg:text-left text-center text-[64px] lg:text-[55px] xl:text-[96px] leading-[0.9em] font-theme-font-medium">
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
};

const page = async () => {
    const tocData: TermsConditionPageType = await client.fetch(tocDataQuery);
    return (
        <>
            <div
                className={
                    "flex flex-col flex-1  pt-[36px] xl:pt-0 md:pt-[15px] pb-[120px]"
                }
            >
                <div className="px-[26px] md:px-0 flex flex-col w-full">
                    <div className="text-[34px] md:text-[54px] xl:text-[64px] text-[#030303] leading-[110%] md:leading-[120%] tracking-[0.68px] md:tracking-[-1.08px] xl:tracking-[-1.28px] py-[24px] md:py-[32px] xl:py-[104px] px-[26px] bg-[#EBEAE2] flex items-center justify-center font-theme-font-medium">
                        TOS
                    </div>
                </div>

                <div className="mt-[45px] md:mt-[30px] xl:mt-[76px] text-[#100F0F] flex flex-col px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] gap-y-[40px] mx-auto max-w-[1050px]">
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">AUTHENTICITY:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.authenticity} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">REJECTION OF SUBMITTALS:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.rejectionOfSubmittals} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">LOSS OR DAMAGE TO ITEMS:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.lossOrDamagToItems} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">INSPECTION OF ITEM:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.inspectionOfItem} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">
                            SERVICES / TIME OF COMPLETION:
                        </div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.servicesTimeOfCompletion} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">FORFEITURE OF ITEMS:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.forfeitureOfItems} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">
                            INDEMNIFICATION, RELEASE AND LIMITATION OF DAMAGES:
                        </div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.indemnificationReleaseAndLimitationOfDamages} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">USE OF PHOTOGRAPHS:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.useOfPhotographs} />
                        </div>
                    </div>

                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">ACTS OF GOD:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.actsOfGod} />
                        </div>
                    </div>

                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">ACKNOWLEDGEMENT:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.acknowledgement} />
                        </div>
                    </div>

                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">WARRANTY:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={tocData?.warranty} />
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default page
