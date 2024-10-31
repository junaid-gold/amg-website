"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
const ChangePasswordDialog = dynamic(() => import("./change-password-dialog"), {
  ssr: false, // Disable server-side rendering if it's not necessary
});


const PasswordAndSecurity = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {
        open &&
        <ChangePasswordDialog open={open} setOpen={setOpen} />
      }
      <div
        className={
          "w-full flex flex-col lg:flex-row  gap-8"
        }
      >
        <div className="flex-1">
          <h3
            className={"font-theme-font-medium mb-4 text-[24px] md:text-[32px]"}
          >
            Password & Security
          </h3>
          <div className="space-y-5">
            <button
              onClick={() => setOpen(true)}
              className="p-6 w-full flex items-center justify-between bg-theme-gray rounded-xl"
            >
              <p className="font-theme-font-normal text-lg">
                Change my password
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={9}
                height={16}
                fill="none"
              >
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 7 7-7 7"
                />
              </svg>
            </button>
            {/*      <div className="p-6 w-full flex items-center justify-between bg-theme-gray rounded-xl">
              <p className="font-theme-font-medium text-lg">
                Two Factor Authentication
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={9}
                height={16}
                fill="none"
              >
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 7 7-7 7"
                />
              </svg>
            </div>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordAndSecurity;
