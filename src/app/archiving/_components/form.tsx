"use client"
import { SearchIcon } from "@/components/icons"
import { useRouter } from "next/navigation"
import React, { FormEvent, useState } from "react"

interface FormProps {
  placeholder: string
}

const Form = ({ placeholder }: FormProps) => {
  const [input, setInput] = useState("")
  const router = useRouter()
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input?.length) {
      router.push(`/hologram-details/${input}`)
    }
  }
  return (
    <form
      onSubmit={handleFormSubmit}
      className={
        "border border-white bg-white rounded-full w-[85%] -mt-8 lg:w-1/2 pl-5 flex justify-between"
      }
      style={{ boxShadow: "0px 0px 19.2px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <input
        className={"bg-transparent w-full py-5 placeholder-black  text-[18px]"}
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
        placeholder={placeholder}
        required
        type="number"
      />
      <button type="submit" className={"text-[14px] px-3"}>
        <SearchIcon />
      </button>
    </form>
  )
}

export default Form
