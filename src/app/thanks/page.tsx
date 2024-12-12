import FooterComponent from "@/components/common/footer.component"
import client from "@/sanity/client"
import { contactDataQuery } from "@/sanity/query"
import { ContactType } from "@/types"

export const revalidate = 0
const page = async () => {
    const contactData: ContactType = await client.fetch(contactDataQuery)
    return (
        <div className="min-h-dvh flex flex-col">
            <div className="flex-1 flex flex-col">
                <div className="flex-1 min-h-96 flex flex-col items-center justify-center overflow-hidden">
                    <div className="flex items-center gap-4 overflow-hidden">
                        <svg width="93" height="92" viewBox="0 0 93 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" width="92" height="92" rx="8" fill="#202020" />
                            <path d="M46.5006 66.8639C35.246 66.8639 26.1224 57.7403 26.1224 46.4857C26.1224 35.2311 35.246 26.1074 46.5006 26.1074C57.7552 26.1074 66.8789 35.2311 66.8789 46.4857C66.8789 57.7403 57.7552 66.8639 46.5006 66.8639Z" fill="#F8F7F3" stroke="#F8F7F3" stroke-width="2.3398" stroke-miterlimit="10" />
                            <path d="M46.5006 66.8639C35.246 66.8639 26.1224 57.7403 26.1224 46.4857C26.1224 35.2311 35.246 26.1074 46.5006 26.1074C57.7552 26.1074 66.8789 35.2311 66.8789 46.4857C66.8789 57.7403 57.7552 66.8639 46.5006 66.8639Z" fill="#F8F7F3" stroke="#F8F7F3" stroke-width="2.3398" stroke-miterlimit="10" />
                            <path d="M46.4995 53.4727C42.6408 53.4727 39.5127 50.3446 39.5127 46.4859C39.5127 42.6271 42.6408 39.499 46.4995 39.499C50.3582 39.499 53.4863 42.6271 53.4863 46.4859C53.4863 50.3446 50.3582 53.4727 46.4995 53.4727Z" stroke="#100F0F" stroke-width="5.82236" stroke-miterlimit="10" />
                            <line y1="-1.16447" x2="14.8213" y2="-1.16447" transform="matrix(-0.707107 0.707107 0.707107 0.707107 63.3848 30.7661)" stroke="#100F0F" stroke-width="2.32894" />
                            <rect width="44.9727" height="44.9727" rx="5.74231" transform="matrix(-1 0 0 1 68.9863 24)" stroke="#F8F7F3" stroke-width="2.8239" stroke-miterlimit="10" />
                        </svg>
                    </div>
                    <h1 className="text-center px-2 text-[32px] mt-4 md:text-[48px] font-theme-font-medium ">
                        Thank you for your order!
                    </h1>
                    <p className="text-[#252422] mt-2 px-4 text-lg text-center">
                        You’ll receive a confirmation email with your order details shortly.
                    </p>
                </div>

                <div className="bg-[#EBEAE2] flex flex-col space-y-4 items-center justify-center py-20 px-8  rounded-t-[56px]">
                    <h1 className="text-[#252422] font-semibold text-2xl text-center">Contact us if you have questions.</h1>
                    <div className="flex items-center flex-wrap sm:justify-center gap-y-4 gap-x-16 ">
                        <div className="flex items-start gap-4">
                            <span className="mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={25}
                                    height={24}
                                    fill="none"
                                >
                                    <path
                                        stroke="#252422"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit={10}
                                        strokeWidth={1.5}
                                        d="M12.5 20.5h-5c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3"
                                    />
                                    <path
                                        stroke="#252422"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit={10}
                                        strokeWidth={1.5}
                                        d="m17.5 9-3.13 2.5c-1.03.82-2.72.82-3.75 0L7.5 9M19.711 14.77l-3.54 3.54c-.14.14-.27.4-.3.59l-.19 1.35c-.07.49.27.83.76.76l1.35-.19c.19-.03.46-.16.59-.3l3.54-3.54c.61-.61.9-1.32 0-2.22-.89-.89-1.6-.6-2.21.01Z"
                                    />
                                    <path
                                        stroke="#252422"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeMiterlimit={10}
                                        strokeWidth={1.5}
                                        d="M19.2 15.28c.3 1.08 1.14 1.92 2.22 2.22"
                                    />
                                </svg>
                            </span>
                            <div className="text-[#252422]">
                                <h2 className="font-semibold mb-0 text-xl">Email</h2>
                                <p className="font-medium text-base">{contactData?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="mt-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={23}
                                    height={22}
                                    fill="none"
                                >
                                    <path
                                        stroke="#252422"
                                        strokeMiterlimit={10}
                                        strokeWidth={1.5}
                                        d="M21.47 17.33c0 .36-.08.73-.25 1.09-.17.36-.39.7-.68 1.02-.49.54-1.03.93-1.64 1.18-.6.25-1.25.38-1.95.38-1.02 0-2.11-.24-3.26-.73s-2.3-1.15-3.44-1.98a28.75 28.75 0 0 1-3.28-2.8 28.414 28.414 0 0 1-2.79-3.27c-.82-1.14-1.48-2.28-1.96-3.41-.48-1.14-.72-2.23-.72-3.27 0-.68.12-1.33.36-1.93.24-.61.62-1.17 1.15-1.67C3.65 1.31 4.35 1 5.09 1c.28 0 .56.06.81.18.26.12.49.3.67.56l2.32 3.27c.18.25.31.48.4.7.09.21.14.42.14.61 0 .24-.07.48-.21.71-.13.23-.32.47-.56.71l-.76.79c-.11.11-.16.24-.16.4 0 .08.01.15.03.23.03.08.06.14.08.2.18.33.49.76.93 1.28.45.52.93 1.05 1.45 1.58.54.53 1.06 1.02 1.59 1.47.52.44.95.74 1.29.92.05.02.11.05.18.08.08.03.16.04.25.04.17 0 .3-.06.41-.17l.76-.75c.25-.25.49-.44.72-.56.23-.14.46-.21.71-.21.19 0 .39.04.61.13.22.09.45.22.7.39l3.31 2.35c.26.18.44.39.55.64.1.25.16.5.16.78Z"
                                    />
                                </svg>
                            </span>
                            <div className="text-[#252422]">
                                <h2 className="font-semibold mb-0 text-xl">Phone</h2>
                                <p className="font-medium text-base">{contactData?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent />
        </div>
    )
}

export default page