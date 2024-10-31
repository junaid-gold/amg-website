import { SearchIcon } from "@/components/icons"
import client from "@/sanity/client"
import { ArchiveType } from "@/types"
import Image from "next/image"
import { archiveDataQuery } from "@/sanity/query"
import WhatWeArchive from "@/components/what-we-archive"
import FooterComponent from "@/components/common/footer.component"
import Form from "./_components/form"
import { PortableText, PortableTextReactComponents } from "next-sanity"


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


export const revalidate = 0
const Archiving = async () => {
  const archiveData: ArchiveType = await client.fetch(archiveDataQuery)
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <div
          className={
            "bg-theme-gray gap-3 -mt-14 lg:mt-0 py-[104px] px-7 lg:px-12 flex flex-col items-center justify-center"
          }
        >
          <h1 className={"font-theme-font-medium text-[48px] lg:text-[64px]"}>
            {archiveData?.heading}
          </h1>

          <div className="w-full lg:w-1/2 text-center">

            <PortableText components={components} value={archiveData?.text} />
          </div>
        </div>
        <div
          className={"flex max-w-[90rem] flex-col items-center justify-center"}
        >
          <Form placeholder={archiveData?.inputPlaceholder} />
          <h1
            className={
              "font-theme-font-medium text-center leading-10 lg:leading-normal text-[36px] lg:text-[48px] my-20 mb-24 mt w-5/6"
            }
          >
            {archiveData?.description}
          </h1>
          <div
            className={"flex flex-col lg:flex-row gap-20 w-full lg:w-5/6 mb-24"}
          >
            <div className={"w-full lg:w-1/2 px-7 lg:px-0"}>
              <h3
                className={
                  "font-theme-font-medium mb-8 text-[32px] lg:text-[40px]"
                }
              >
                Type
              </h3>
              <div className={"flex flex-col gap-8"}>
                {archiveData?.types?.map((data) => (
                  <div
                    key={data?.heading}
                    className={"flex items-center justify-between"}
                  >
                    <p
                      className={
                        "text-[36px] lg:text-[52px] font-theme-font-light"
                      }
                    >
                      {data?.heading}
                    </p>
                    <Image
                      src={data?.image}
                      alt={data?.heading}
                      width={54}
                      height={54}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={"w-full lg:w-1/2 px-7 lg:px-0"}>
              <h3
                className={
                  "font-theme-font-medium mb-8 text-[32px] md:text-[40px]"
                }
              >
                Variation
              </h3>
              <div className={"flex flex-col gap-8"}>
                {archiveData?.variations?.map((data) => (
                  <div
                    key={data.heading}
                    className={"flex items-center justify-between"}
                  >
                    <p
                      className={
                        "text-[36px] md:text-[52px] font-theme-font-light"
                      }
                    >
                      {data.heading}
                    </p>
                    <div
                      className={`flex gap-3 md:gap-8 items-center justify-center`}
                    >
                      <Image
                        src={data?.image}
                        alt={data?.heading}
                        width={54}
                        height={54}
                      />

                      <div
                        style={{
                          backgroundColor: data.color.hex,
                        }}
                        className={"h-[55px] w-[13px]"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={"bg-theme-gray w-full flex items-center justify-center"}
        >
          <div
            className={
              "max-w-[90rem] w-full gap-3 py-[104px] px-7 md:px-12 flex flex-col"
            }
          >
            <h1 className={"font-theme-font-medium text-[36px] md:text-[64px]"}>
              Grades
            </h1>


            <PortableText components={components} value={archiveData?.descriptionOne} />
            <PortableText components={components} value={archiveData?.descriptionTwo} />
          </div>
        </div>
        <div
          className={
            "gap-3 py-[50px] max-w-[90rem] w-full md:py-[104px] px-7 md:px-12 flex flex-col"
          }
        >
          <h1 className={"font-theme-font-medium text-[36px] md:text-[64px]"}>
            What we encapsulate
          </h1>
          <WhatWeArchive />
        </div>
      </div>

      <FooterComponent />
    </>
  )
}

export default Archiving
