"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface TabsListProps {
  currentTab: number
  setCurrentTab: Dispatch<SetStateAction<number>>
}

const TabsList = ({ currentTab, setCurrentTab }: TabsListProps) => {
  return (
    <div
      className={
        "w-full border-b-4 border-b-[#F2F1F1] flex items-center justify-center px-5 lg:px-12"
      }
    >
      <div className={"flex gap-4 md:gap-6 lg:gap-[120px] overflow-x-auto w-full max-w-[90rem]"}>
        <button
          onClick={() => {
            setCurrentTab(1)
          }}
          className={`py-[12px] md:py-[20px] min-w-fit lg:py-[30px] px-4 ${currentTab === 1 || !currentTab ? "border-b-[6px] border-b-[#FF6262] font-theme-font-medium" : "font-theme-font-light"}`}
        >
          <p
            className={
              ` text-[16px] md:text-[20px] lg:text-[24px]
              ${currentTab === 1 || !currentTab ? "font-theme-font-medium" : "font-theme-font-light"}
              `
            }
          >
            Account
          </p>
        </button>
        <button
          onClick={() => setCurrentTab(2)}
          className={`py-[12px] md:py-[20px] min-w-fit lg:py-[30px] px-4 ${currentTab === 2 ? "border-b-[6px] border-b-[#FF6262]" : ""}`}
        >
          <p
            className={
              `min-w-fit text-[16px] md:text-[20px] lg:text-[24px]
              ${currentTab === 2 ? "font-theme-font-medium" : "font-theme-font-light"}
              `
            }
          >
            Orders
          </p>
        </button>
        <button
          onClick={() => setCurrentTab(3)}
          className={`py-[12px] md:py-[20px] min-w-fit  lg:py-[30px] px-4 ${currentTab === 3 ? "border-b-[6px] border-b-[#FF6262]" : ""}`}
        >
          <p
            className={
              `text-[16px] md:text-[20px] lg:text-[24px]
              ${currentTab === 3 ? "font-theme-font-medium" : "font-theme-font-light"}
              `
            }
          >
            Submissions
          </p>
        </button>
        <button
          onClick={() => setCurrentTab(4)}
          className={`py-[12px] md:py-[20px] min-w-fit lg:py-[30px] px-4 ${currentTab === 4 ? "border-b-[6px] border-b-[#FF6262]" : ""}`}
        >
          <p
            className={
              `text-[16px] md:text-[20px] lg:text-[24px]
              ${currentTab === 4 ? "font-theme-font-medium" : "font-theme-font-light"}
              `
            }
          >
            Address Book
          </p>
        </button>
      </div>
    </div>
  );
};

export default TabsList;
