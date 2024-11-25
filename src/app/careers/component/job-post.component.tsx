"use client"
import { JobType } from "@/types";

const JobPostComponent = ({ data }: { data: JobType }) => {
  const handleOpenEmail = () => {
    window.location.href = 'mailto:jobs@audiomediagrading.com';
  };
  return (
    <a target="_blank"
      rel="noopener noreferrer"
      href={data?.heading === "Lead Researcher" ? "https://docs.google.com/document/d/1ISZsdUL3J_3oa9VedS6X1JD4LVR8hmCV/edit" : "https://docs.google.com/document/d/16TVqcSYxyjBWaisu8HzepitoQ7d_7y-e/edit"}
      className="w-full block"
    >

      <div

        className={
          "py-12 flex items-center justify-between flex-col min-h-[280px] lg:flex-row w-full sm:w-[48%] lg:w-full lg:px-16 rounded-2xl relative overflow-hidden"
        }
        style={{ boxShadow: "0px 0px 19.2px 0px #00000040" }}
      >
        <div
          className={
            "flex flex-col items-center mb-12 lg:mb-0 lg:items-start lg:gap-14 justify-between"
          }
        >
          <div
            className={"flex mb-6 lg:mb-0 flex-col items-center lg:items-start"}
          >
            <h1
              className={
                "font-theme-font-medium text-center text-[24px] lg:text-[36px]"
              }
            >
              {data?.heading}
            </h1>
            <p
              className={
                "font-theme-font-light text-center text-[14px] lg:text-[18px]"
              }
            >
              {data?.text}
            </p>
          </div>
          <div className={"flex gap-4"}>
            {data?.tags?.map((tag, index) => (
              <div
                key={`${tag?.label}${index}`}
                className={
                  "w-[9em] flex items-center justify-center py-3 text-[12px] bg-[#fff] font-theme-font-roman rounded-xl"
                }
              >
                <span>{tag?.label}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleOpenEmail}
          className={
            "w-[85%] md:w-[80%] lg:w-[20%] h-fit rounded-full border border-theme-black text-theme-black bg-transparent flex items-center justify-center px-2 py-3"
          }
        >
          <p className={"font-theme-font-roman"}>Apply Now</p>
        </button>
        <div
          style={{
            backgroundColor: data?.color,
          }}
          className={` h-[12px] w-full absolute bottom-0 left-0`}
        />
      </div>
    </a>
  );
};

export default JobPostComponent;
