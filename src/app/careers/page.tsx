import client from "@/sanity/client"
import { CareerType } from "@/types"
import { careerDataQuery } from "@/sanity/query"
import JobsList from "./component/jobs-list"
import FooterComponent from "@/components/common/footer.component"

export const revalidate = 0
const Page = async () => {
  const careerData: CareerType = await client.fetch(careerDataQuery)
  return (
    <>
      <div className={"flex flex-col items-center justify-center"}>
        <div
          className={
            "w-full bg-theme-gray gap-2 py-[64px] lg:py-[104px] px-7 lg:px-12 flex flex-col items-center justify-center"
          }
        >
          <h1
            className={
              "font-theme-font-medium text-center text-[48px] lg:text-[64px]"
            }
          >
            {careerData?.heading}
          </h1>
          <p
            className={"font-theme-font-light text-center text-[18] max-w-2xl"}
          >
            {careerData?.text}
          </p>
        </div>
        <JobsList />
      </div>

      <FooterComponent />
    </>
  )
}

export default Page
