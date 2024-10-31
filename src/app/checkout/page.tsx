import Image from "next/image"
import {
  CartIcon,
  CircleCheckIcon,
  DownArrowIcon,
  VisaPaymentIcon,
} from "@/components/icons"
import ThemeCheckboxComponent from "@/components/common/theme-checkbox.component"

const Checkout = () => {
  return (
    <div>
      <div className={"px-4 py-6 flex bg-[#fff] justify-between items-center"}>
        <Image src={"/logo/amg.svg"} alt={"amg"} width={124} height={38} />
        <button>
          <CartIcon />
        </button>
      </div>
      <div
        className={
          "p-4 flex bg-[#F5F5F5] border border-[#DEDEDE] justify-between border-b items-center"
        }
      >
        <div className={"flex gap-2 items-center"}>
          <p className={"text-[#9747FF] text-[14px] font-normal"}>
            Show order summary
          </p>
          <DownArrowIcon size={"16"} fill={"#9747FF"} />
        </div>
        <p className={"font-semibold text-base"}>$103.00</p>
      </div>
      <div
        className={
          "flex justify-center bg-[#fff] items-center p-6 flex-col gap-4"
        }
      >
        <div className={"flex gap-4 items-center w-full my-2"}>
          <CircleCheckIcon />
          <div>
            <p className={"text-[#707070] text-[14px] font-light opacity-75"}>
              Confirmation #DQFDHG5E0
            </p>
            <p className={"text-[21px] font-semibold"}>Thank you, Jordan!</p>
          </div>
        </div>
        <div className={"p-4 border rounded-t w-full flex flex-col gap-4"}>
          <p>Your order is confirmed</p>
          <p
            className={
              "text-[#707070] text-[14px] font-light opacity-75 -mt-2.5"
            }
          >
            You’ll get a confirmation email with your order number soon.
          </p>
          <button className={"border rounded w-full py-2"}>
            <p className={"text-[#9747FF] text-[14px]"}>
              Download Shop to track package
            </p>
          </button>
        </div>
        <div
          className={
            "p-4 border border-t-0 bg-[#F5F5F5] -mt-4 rounded-b w-full flex"
          }
        >
          <ThemeCheckboxComponent />
          <p className={"text-[14px] font-theme-font-light"}>
            Email me new news and offers
          </p>
        </div>
        <div className={"p-4 border rounded-t w-full flex flex-col gap-4"}>
          <p>Order details</p>
          <div>
            <p
              className={
                "text-[#707070] text-[14px] font-light opacity-75 mb-0.5"
              }
            >
              Contact information
            </p>
            <p className={"text-[14px]"}>jordan.chen@domain.com</p>
          </div>
          <div>
            <p
              className={
                "text-[#707070] text-[14px] font-light opacity-75 mb-0.5"
              }
            >
              Shipping address
            </p>
            <p className={"text-[14px]"}>
              {"Jordan Chen\n" +
                "151 O'Connor St\n" +
                "Ottawa, ON, K2P 2L8\n" +
                "Canada"}
            </p>
          </div>
          <div>
            <p
              className={
                "text-[#707070] text-[14px] font-light opacity-75 mb-0.5"
              }
            >
              Shipping method
            </p>
            <p className={"text-[14px]"}>FedEx Ground</p>
          </div>
          <div>
            <p
              className={
                "text-[#707070] text-[14px] font-light opacity-75 mb-0.5"
              }
            >
              Payment method
            </p>
            <div className={"flex gap-2 items-center"}>
              <VisaPaymentIcon />
              <p className={"text-[14px] mt-0.5"}>Visa •••• 1234 - $74.00</p>
            </div>
          </div>
          <div>
            <p
              className={
                "text-[#707070] text-[14px] font-light opacity-75 mb-0.5"
              }
            >
              Billing address
            </p>
            <p className={"text-[14px]"}>
              {"Jordan Chen\n" +
                "151 O'Connor St\n" +
                "Ottawa, ON, K2P 2L8\n" +
                "Canada"}
            </p>
          </div>
        </div>
        <div
          className={
            "p-4 border border-t-0 bg-[#F5F5F5] -mt-4 rounded-b w-full flex"
          }
        >
          <ThemeCheckboxComponent />
          <p className={"text-[14px] font-theme-font-light"}>
            Save my information for a faster checkout
          </p>
        </div>
        <button
          className={
            "flex py-4 mt-2 items-center justify-center rounded-md bg-black w-full"
          }
        >
          <p className={"font-light text-base text-[#fff]"}>
            Continue shopping
          </p>
        </button>
        <p className={"text-[14px] mt-2"}>
          Need help? <a className={"text-[#9747FF] underline"}>Contact us</a>
        </p>
      </div>
      <div className={"flex justify-between bg-[#fff] items-center p-6 border"}>
        <a
          className={"text-[#9747FF] underline text-[14px]"}
          href="https://docs.google.com/document/d/1aEnSRCDm2FtdHJ3Pn8eX9Bk5vTfaX4ivJvUGaw2qUSc/edit"
        >
          Repair policy
        </a>
        <a
          className={"text-[#9747FF] underline text-[14px]"}
          href="https://docs.google.com/document/d/1z0rqvYRo3ez66mRY0sywYPiaDBDcZ1e8Dw56PlOdJ-I/edit"
        >
          Privacy Policy
        </a>
        <a
          className={"text-[#9747FF] underline text-[14px]"}
          href="https://docs.google.com/document/d/1zHzLPMHz6USvRZIqgklelRbl7f-i2ik7/edit"
        >
          Terms of service
        </a>
      </div>
    </div>
  )
}

export default Checkout
