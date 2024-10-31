import FooterComponent from "@/components/common/footer.component"
import client from "@/sanity/client";
import { contactDataQuery, privacyDataQuery, returnDataQuery } from "@/sanity/query";
import { ContactType, ReturnPageType } from "@/types";
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
  const [returnPageData, contactData]: [ReturnPageType, ContactType] = await Promise.all([
    client.fetch(returnDataQuery),
    client.fetch(contactDataQuery)
  ]);

  return (
    <>
      <div
        className={
          "flex flex-col flex-1  pt-[36px] xl:pt-0 md:pt-[15px] pb-[120px]"
        }
      >
        <div className="px-[26px] md:px-0 flex flex-col w-full">
          <div className="text-[34px] md:text-[54px] xl:text-[64px] text-[#030303] leading-[110%] md:leading-[120%] tracking-[0.68px] md:tracking-[-1.08px] xl:tracking-[-1.28px] py-[24px] md:py-[32px] xl:py-[104px] px-[26px] bg-[#EBEAE2] flex items-center justify-center font-theme-font-medium">
            Returns
          </div>
        </div>

        <div className="mt-[45px] md:mt-[30px] xl:mt-[76px] text-[#100F0F] flex flex-col md:flex-row px-[40px] md:px-[50px] gap-x-[28px] xl:gap-x-[62px] mx-auto max-w-[1024px]">
          {/* Col 1: Repair Policy */}
          <div className="text-[18px] leading-[147%] tracking-[0.18px] max-w-[428px]">
            <div className="font-theme-font-bold">Repair Policy</div>
            <div className="font-theme-font-light">
              <PortableText components={components} value={returnPageData?.repairPolicy} />

            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col max-w-[482px]">
            {/* Contact Information */}
            <div className="mt-[40px] md:mt-0">
              <div className="font-theme-font-bold text-[18px] leading-[147%] tracking-[0.18px]">
                Contact Information
              </div>
              <div className="mt-[20px] gap-y-[26px] flex flex-col">
                <div className="flex items-center gap-x-4">
                  <div>
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.2039 0.424316V2.35275C18.1113 2.35275 19.8982 2.83486 21.5647 3.79908C23.1508 4.74321 24.4157 6.00875 25.3594 7.59569C26.3231 9.26299 26.805 11.0508 26.805 12.9592H28.7324C28.7324 10.6892 28.1602 8.58 27.0158 6.63147C25.9115 4.74321 24.4157 3.24666 22.5284 2.14183C20.5809 0.996821 18.4727 0.424316 16.2039 0.424316ZM6.23538 3.31697C5.69328 3.31697 5.22146 3.48772 4.8199 3.82921L1.7179 6.99305L1.80825 6.93279C1.30631 7.35464 0.975027 7.87692 0.814406 8.49965C0.673862 9.12237 0.714017 9.72501 0.934872 10.3076C1.49705 11.8744 2.24996 13.4814 3.19361 15.1286C4.51874 17.3986 6.09484 19.4375 7.92191 21.2454C10.8532 24.1983 14.4973 26.5285 18.8542 28.236H18.8843C19.4666 28.4369 20.0488 28.477 20.6311 28.3565C21.2334 28.236 21.7655 27.9748 22.2273 27.5731L25.269 24.5298C25.6706 24.128 25.8714 23.6359 25.8714 23.0533C25.8714 22.4507 25.6706 21.9485 25.269 21.5467L21.3238 17.5693C20.9222 17.1676 20.4203 16.9667 19.8179 16.9667C19.2156 16.9667 18.7137 17.1676 18.3121 17.5693L16.4148 19.4978C14.8889 18.7746 13.5637 17.8807 12.4394 16.816C11.315 15.7313 10.4216 14.4155 9.75901 12.8688L11.6865 10.9403C12.1081 10.4984 12.3189 9.97611 12.3189 9.37347C12.3189 8.75074 12.078 8.24855 11.5961 7.86688L11.6865 7.95727L7.65086 3.82921C7.2493 3.48772 6.77748 3.31697 6.23538 3.31697ZM16.2039 4.28119V6.20963C17.4287 6.20963 18.553 6.51095 19.577 7.11358C20.621 7.71622 21.4442 8.53982 22.0466 9.58439C22.6489 10.6089 22.95 11.7338 22.95 12.9592H24.8775C24.8775 11.3923 24.486 9.93593 23.703 8.59004C22.9199 7.28433 21.8759 6.23976 20.5708 5.45633C19.2256 4.6729 17.77 4.28119 16.2039 4.28119ZM6.23538 5.24541C6.29561 5.24541 6.36588 5.27554 6.4462 5.3358L10.3915 9.37347C10.4115 9.45382 10.3915 9.52413 10.3312 9.58439L7.47016 12.4168L7.68097 13.0194L8.07249 13.8631C8.39373 14.5461 8.76517 15.209 9.1868 15.8518C9.76905 16.7558 10.4115 17.5292 11.1143 18.172C12.0579 19.096 13.1923 19.9397 14.5174 20.703C15.18 21.0847 15.7422 21.3659 16.2039 21.5467L16.8063 21.8179L19.7276 18.8951C19.7677 18.8549 19.7979 18.8349 19.8179 18.8349C19.838 18.8349 19.8681 18.8549 19.9083 18.8951L23.974 22.9629C24.0142 23.0031 24.0342 23.0332 24.0342 23.0533C24.0342 23.0533 24.0142 23.0734 23.974 23.1136L20.9624 26.0966C20.5206 26.4783 20.0388 26.5787 19.5168 26.398C15.4209 24.811 12.0077 22.6415 9.27715 19.8895C7.59062 18.2021 6.11491 16.2837 4.85002 14.1343C3.94652 12.5875 3.24381 11.091 2.74186 9.64466V9.61452C2.66155 9.43373 2.65151 9.22281 2.71175 8.98176C2.77198 8.72061 2.88241 8.51973 3.04303 8.37912L6.02456 5.3358C6.0848 5.27554 6.15507 5.24541 6.23538 5.24541ZM16.2039 8.13806V10.0665C17.0071 10.0665 17.6897 10.3477 18.2519 10.9102C18.814 11.4727 19.0951 12.1556 19.0951 12.9592H21.0226C21.0226 12.0954 20.8017 11.2919 20.36 10.5486C19.9384 9.80536 19.3561 9.22281 18.6133 8.80096C17.8704 8.35903 17.0673 8.13806 16.2039 8.13806Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="text-[18px] leading-[20px] tracking-[0.36px]">
                    <div className=" text-black font-theme-font-bold">
                      PHONE
                    </div>
                    <div className=" font-theme-font-light">{contactData?.phone}</div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.95455 2.625V4.59624L1.75 8.63565V25.375H26.5682V8.63565L20.3636 4.59624V2.625H7.95455ZM10.0227 4.69318H18.2955V12.6428L14.1591 15.3249L10.0227 12.6428V4.69318ZM11.0568 6.76136V8.82955H17.2614V6.76136H11.0568ZM7.95455 7.0522V11.2855L4.6907 9.18501L7.95455 7.0522ZM20.3636 7.0522L23.6275 9.18501L20.3636 11.2855V7.0522ZM11.0568 9.86364V11.9318H17.2614V9.86364H11.0568ZM3.81818 11.0916L14.1591 17.7809L24.5 11.0916V23.3068H3.81818V11.0916Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="text-[18px] leading-[20px] tracking-[0.36px]">
                    <div className=" text-black font-theme-font-bold">
                      EMAIL
                    </div>
                    <div className=" font-theme-font-light">
                      {contactData?.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-x-4">
                  <div>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.95455 2.625V4.59624L1.75 8.63565V25.375H26.5682V8.63565L20.3636 4.59624V2.625H7.95455ZM10.0227 4.69318H18.2955V12.6428L14.1591 15.3249L10.0227 12.6428V4.69318ZM11.0568 6.76136V8.82955H17.2614V6.76136H11.0568ZM7.95455 7.0522V11.2855L4.6907 9.18501L7.95455 7.0522ZM20.3636 7.0522L23.6275 9.18501L20.3636 11.2855V7.0522ZM11.0568 9.86364V11.9318H17.2614V9.86364H11.0568ZM3.81818 11.0916L14.1591 17.7809L24.5 11.0916V23.3068H3.81818V11.0916Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  <div className="text-[18px] leading-[20px] tracking-[0.36px]">
                    <div className=" text-black font-theme-font-bold">
                      ADDRESS
                    </div>
                    <div className=" font-theme-font-light">
                      {contactData?.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Paragraph */}
            <div className="mt-[40px] text-[18px] leading-[147%] tracking-[0.18px] font-theme-font-light">
              {
                returnPageData?.contactDescription
              }
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  )
}

export default page
