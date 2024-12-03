import FooterComponent from '@/components/common/footer.component';
import client from '@/sanity/client';
import { leadResearchDataQuery } from '@/sanity/query';
import { LeadResearchPageType } from '@/types';
import { PortableText, PortableTextReactComponents } from 'next-sanity';
import React from 'react'

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
            </a>),
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
    const leadResearchData: LeadResearchPageType = await client.fetch(leadResearchDataQuery);
    return (
        <>
            <div
                className={
                    "flex flex-col flex-1  pt-[36px] xl:pt-0 md:pt-[15px] pb-[120px]"
                }
            >
                <div className="px-[26px] md:px-0 flex flex-col w-full">
                    <div className="text-[34px] md:text-[54px] xl:text-[64px] text-[#030303] leading-[110%] md:leading-[120%] tracking-[0.68px] md:tracking-[-1.08px] xl:tracking-[-1.28px] py-[24px] md:py-[32px] xl:py-[104px] px-[26px] bg-[#EBEAE2] flex items-center justify-center font-theme-font-medium">
                        Lead Researcher
                    </div>
                </div>

                <div className="mt-[45px] md:mt-[30px] xl:mt-[76px] text-[#100F0F] flex flex-col px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] gap-y-[40px] mx-auto max-w-[1050px]">
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">About The Company:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={leadResearchData?.aboutTheCompany} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">About The Role:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={leadResearchData?.aboutTheRole} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">Responsibilities:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={leadResearchData?.responsibilities} />
                        </div>
                    </div>
                    {/* Section */}
                    <div className="text-[18px] leading-[147%] tracking-[0.18px]">
                        <div className="font-theme-font-bold">Who You Are:</div>
                        <div className="font-theme-font-light">
                            <PortableText components={components} value={leadResearchData?.whoYouAre} />
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </>
    )
}

export default Page