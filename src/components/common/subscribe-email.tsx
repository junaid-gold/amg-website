"use client"
import React, { useState } from "react"

const SubscribeEmail = () => {
  const [inputText, setInputText] = useState("")
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setInputText("Thank you!")
  }
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          "border border-white rounded-lg w-full lg:w-[310px] mt-[10px] pl-3 sm:pl-6 flex justify-between"
        }
      >
        <input
          required
          value={inputText}
          onChange={(e) => {
            setInputText(e?.target?.value)
          }}
          type={"email"}
          className={
            "bg-transparent w-full py-3 placeholder:text-white text-[16px]"
          }
          placeholder={"Email Address"}
          // value={layoutData?.email}
        />
        <button
          type={"submit"}
          className={"text-[14px] w-fit border-l border-l-white px-4"}
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}
export default SubscribeEmail
