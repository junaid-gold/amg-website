"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import { CloseIcon, MenuIcon, PlusIcon } from "@/components/icons"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import Avatar from "./avatar"
import Cart from "./cart"
import CartButton from "./cart-button"
import useOpenCart from "@/hooks/use-open-cart"

const WrapperMain = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const { openCart: openCartGlobal, setOpenCart: setOpenCartGlobal } = useOpenCart()
  const pathName = usePathname()
  const [openSideBar, setOpenSideBar] = useState<boolean>(false)
  const [openCart, setOpenCart] = useState<boolean>(false)

  const router = useRouter()
  useEffect(() => {
    setOpenCart(false)
    setOpenCartGlobal(false)
  }, [pathName])

  useEffect(() => {
    router.refresh()
  }, [pathName])

  useEffect(() => {
    if (window.location.hash === "#sidebar") {
      window.location.hash = ""
      setOpenCart(true)
    }
  }, [pathName])
  const paths = [
    // "/single-page-form", 
    "/media-submission",
    "/checkout",
  ]
  const isPathMatched = (pathName: string) => {
    return paths.some((path) => pathName.startsWith(path))
  }
  if (isPathMatched(pathName)) {
    return (
      <div
        className={`min-h-screen ${openSideBar ? "h-screen overflow-hidden" : ""
          } w-full flex-1 flex flex-col relative`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen ${openSideBar || openCart || openCartGlobal ? "h-screen overflow-hidden" : ""
        } w-full flex flex-col relative`}
    >
      {
        pathName?.includes("/payment-form") ?
          <div className={"px-4 py-6  bg-[#fff]"}>
            <div className="flex max-w-[68rem] mx-auto w-full justify-between items-center">
              <Link href={"/"}>
                <Image src={"/logo/amg.svg"} alt={"amg"} width={124} height={38} />
              </Link>
              <CartButton setOpenCart={setOpenCart} />
            </div>
          </div>
          :
          <div
            className="w-full h-[99px] px-4 sm:px-12 relative z-10 flex justify-center bg-container-bg"
            style={{ boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.15)" }}
          >
            <div
              className={
                "max-w-[90rem] h-[99px] w-full items-center justify-between flex"
              }
            >
              <div className={"hidden flex-1 lg:flex flex-row gap-10"}>
                <Link
                  className={`text-lg font-theme-font-roman ${pathName === "/about" ? "underline" : ""
                    }`}
                  href={"/about"}
                  onClick={() => setOpenSideBar(false)}
                >
                  About
                </Link>
                <Link
                  className={`text-lg font-theme-font-roman ${pathName === "/archiving" ? "underline" : ""
                    }`}
                  href={"/archiving"}
                  onClick={() => setOpenSideBar(false)}
                >
                  Archiving
                </Link>
                <Link
                  className={`text-lg font-theme-font-roman ${pathName === "/merch" ? "underline" : ""
                    }`}
                  href={"/merch"}
                  onClick={() => setOpenSideBar(false)}
                >
                  Merch
                </Link>
              </div>

              <button
                onClick={() => setOpenSideBar(!openSideBar)}
                className={"block mr-4 lg:hidden"}
              >
                <MenuIcon />
              </button>

              <Link href={"/"}>
                <Image
                  src={"/logo/amg.svg"}
                  alt={"logo"}
                  width={137}
                  height={41.144}
                  className={
                    "!w-[75px] !h-[22.524px] lg:!w-[137px] lg:!h-[41.144px]"
                  }
                />
              </Link>
              <div className={"flex flex-row gap-4 flex-1 justify-end items-center"}>

                {session?.data?.accessToken ? (
                  <>
                    {
                      !pathName.includes("/single-page-form") &&
                      <Link
                        href={"/single-page-form"}
                        className={
                          "flex gap-2 items-center rounded-full border border-[#252422] px-2 py-2.5 sm:px-4 sm:py-2.5"
                        }
                      >
                        <PlusIcon />
                        <p className={"font-theme-font-roman"}>Submit media</p>
                      </Link>
                    }
                    <Avatar />
                  </>
                ) : (
                  <Link
                    href={"/sign-in"}
                    className={
                      "flex gap-2 items-center rounded-full border border-[#252422] px-2 py-2.5 sm:px-4 sm:py-2.5"
                    }
                  >
                    <p className={"font-theme-font-roman"}>Login</p>
                  </Link>
                )}
                {session?.data?.accessToken && (
                  <>
                    <CartButton setOpenCart={setOpenCart} />
                    <button
                      onClick={() => {
                        signOut()
                      }}
                      className="hidden lg:flex gap-2 items-center rounded-full border border-[#252422] px-4 py-2.5"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
      }
      <div
        className={"w-full flex flex-col justify-center flex-1 items-center"}
      >
        <div className={"w-full flex flex-col flex-1"}>{children}</div>
      </div>
      {openSideBar && (
        <div
          className={
            "absolute top-0 flex flex-row left-0 animate-out w-full h-screen z-20"
          }
        >
          <div
            className={
              "bg-white w-4/6 py-10 h-full flex flex-col items-center justify-between"
            }
          >
            <Link onClick={() => setOpenSideBar(false)} href={"/"}>
              <Image
                src={"/logo/amg.svg"}
                alt={"logo"}
                width={137}
                height={41.144}
                className={"!w-[120px] !h-[31.144px]"}
              />
            </Link>
            <div className={"flex flex-col gap-8"}>
              <Link
                className={`text-[32px] font-theme-font-bold ${pathName === "/about" ? "underline" : ""
                  }`}
                href={"/about"}
                onClick={() => setOpenSideBar(false)}
              >
                About
              </Link>
              <Link
                className={`text-[32px] font-theme-font-bold ${pathName === "/archiving" ? "underline" : ""
                  }`}
                href={"/archiving"}
                onClick={() => setOpenSideBar(false)}
              >
                Archiving
              </Link>
              <Link
                className={`text-[32px] font-theme-font-bold ${pathName === "/merch" ? "underline" : ""
                  }`}
                href={"/merch"}
                onClick={() => setOpenSideBar(false)}
              >
                Merch
              </Link>
            </div>
            <div
              className={
                "text-sm text-black opacity-40 flex justify-center items-center lg:items-end lg:justify-end w-full"
              }
            >
              <p>© Audio Media Grading 2024</p>
            </div>
          </div>
          <div
            onClick={() => setOpenSideBar(false)}
            className={"bg-[rgba(255,255,255,0.7)] w-2/6 h-full"}
          >
            <button
              className={
                "absolute top-[36px] border bg-black border-[#292927] rounded-md right-5 flex items-center justify-center"
              }
              onClick={() => setOpenSideBar(false)}
            >
              <CloseIcon stroke="#fff" />
            </button>
          </div>
        </div>
      )}

      {
        openCartGlobal && <Cart setOpenCart={setOpenCart} />
      }
      {openCart && <Cart setOpenCart={setOpenCart} />}
    </div>
  )
}

export default WrapperMain
