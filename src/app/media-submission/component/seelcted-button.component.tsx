import { usePathname } from "next/navigation"
import React from "react"

const SelectedButtonComponent = ({
  children,
  selected,
  onClick,
  className,
  title,
}: {
  children: React.ReactNode
  selected: boolean
  onClick: () => void
  className?: string
  title?: string
}) => {
  const pathname = usePathname()
  return (
    <button
      onClick={onClick}
      className={`border border-theme-gray  ${selected
          ? "shadow-selected-shadow"
          : "hover:shadow-selected-shadow-hover"
        } flex flex-col justify-center items-center  gap-4 rounded-xl 
      ${pathname?.includes("single-page-form")
          ? className?.length
            ? `${className} py-2`
            : "py-2 min-w-[151px] h-[201px]  max-w-[151px] w-full "
          : "py-4 lg:py-8  w-[45%] lg:w-[40%]"
        }
      `}
    >
      {children}
      <div
        className={
          "rounded-full border-2 w-6 h-6 bg-[#fff] flex items-center justify-center border-[#D9D9D9]"
        }
      >
        <div
          className={`w-[14px] h-[14px] rounded-full ${selected ? "bg-[#1ACCF3]" : "bg-[#fff]"
            }`}
        />
      </div>
    </button>
  )
}

export default SelectedButtonComponent
