import client from "@/sanity/client";
import { JobType } from "@/types";
import JobPostComponent from "./job-post.component";
import { jobsDataQuery } from "@/sanity/query";

const JobsList = async () => {
  const jobsData: JobType[] = await client.fetch(jobsDataQuery);

  return (
    <div
      className={
        "flex flex-wrap max-w-[90rem] w-full items-center justify-center sm:gap-4 gap-8 lg:gap-8 mb-20 mt-20 px-6"
      }
    >
      {jobsData.map((value, index) => (
        <JobPostComponent data={value} key={`${value?.heading}${index}`} />
      ))}
    </div>
  );
};

export default JobsList;
