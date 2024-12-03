"use client"
import { JobType } from "@/types";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const JobPostComponent = ({ data }: { data: JobType }) => {
  const handleOpenEmail = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    window.location.href = 'mailto:jobs@audiomediagrading.com';
  };

  const buttonRef = useRef(null)

  const router = useRouter()
  const handleBoxClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Node; // Explicitly cast event.target to Node
    // @ts-ignore
    if (buttonRef.current && buttonRef.current?.contains(target)) {
      // The button was clicked, so ignore the box click behavior
      return;
    }
    data?.heading === "Lead Researcher"
      ? "https://docs.google.com/document/d/1ISZsdUL3J_3oa9VedS6X1JD4LVR8hmCV/edit"
      : router.push("/amg-grader");


    // I want to check is the buttonRef is clicked or not
    // Open URL in a new tab
    // window.open(url, "_blank");
  }

  return (
    <div
      onClick={handleBoxClick}
      className="w-full cursor-pointer sm:w-[48%] lg:w-full block"
    >
      <div
        className={
          "py-12 flex items-center justify-between flex-col min-h-[280px] lg:flex-row w-full lg:px-16 rounded-2xl relative overflow-hidden"
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
        {/* Dont open the a href link on this button click instead open the mail box */}
        <button
          ref={buttonRef}
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
    </div>
  );
};

export default JobPostComponent;
