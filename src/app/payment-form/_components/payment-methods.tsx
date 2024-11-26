"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Address, PaymentMethod } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { chargeCustomer, createSubmission, doApiRequest, setPaymentMethod, setShippingAddress } from "../actions";
import { errorHandler } from "@/lib/utils";
import toast from "react-hot-toast";
import axios from "axios";
import WhiteAnimation from "@/components/white-animation";
import { getStoredPaymentMethods, storePaymentMethod } from "@/app/account/actions";

export const formatCreditCardNumber = (value: string) => {
  // Remove any non-numeric characters and spaces
  const sanitizedValue = value.replace(/\D/g, '');

  // Add a space after every 4 characters
  const formattedValue = sanitizedValue.replace(/(.{4})/g, '$1 ');

  // Trim the extra space at the end if necessary
  return formattedValue.trim();
};


interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  addresses: Address[];
  selectedShippingAddress: number | undefined;
  selectedBillingAddress: number | undefined

  isBothAddressSame: boolean
  setIsBothAddressSame: Dispatch<SetStateAction<boolean>>
}

const PaymentMethods = ({
  paymentMethods,
  addresses,
  selectedShippingAddress,
  selectedBillingAddress,
  isBothAddressSame,
  setIsBothAddressSame
}: PaymentMethodsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const [agreeWithTerms, setAgreeWithTerms] = useState(false);
  const handleAgreeWithTermsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAgreeWithTerms(event.target.checked);
  };
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [creditCardExpiryMonth, setCreditCardExpiryMonth] = useState("");
  const [creditCardExpiryYear, setCreditCardExpiryYear] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [creditCardCVC, setCreditCardCVC] = useState("");
  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });
  // Validation helper functions
  const validateCardNumber = (number: string) => {
    // Remove all spaces before validating the card number
    const sanitizedNumber = number.replace(/\s+/g, '');

    // Regex to check if the card number has between 13 and 19 digits
    const cardNumberRegex = /^[0-9]{13,19}$/;

    return cardNumberRegex.test(sanitizedNumber) ? "" : "Invalid card number";
  };

  const validateExpiryMonth = (month: string) => {
    const monthRegex = /^(0[1-9]|1[0-2])$/; // MM format from 01 to 12
    return monthRegex.test(month) ? "" : "Invalid expiry month";
  };
  const validateExpiryYear = (year: string) => {
    const currentYear = new Date().getFullYear();
    return parseInt(year, 10) >= currentYear ? "" : "Invalid expiry year";
  };
  const validateCVC = (cvc: string) => {
    const cvcRegex = /^[0-9]{3,4}$/; // Validates CVC with length 3 or 4 digits
    return cvcRegex.test(cvc) ? "" : "Invalid CVC";
  };

  const [selectedCard, setSelectedCard] = useState("New Card")

  const [saveCreditCard, setSaveCreditCard] = useState(false)
  const handleCreditCardInputChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>,
    validator: (value: string) => string,
    errorField: keyof typeof errors
  ) => {
    setter(value);
    const error = validator(value);
    setErrors((prevErrors) => ({ ...prevErrors, [errorField]: error }));
  };


  // Helper function to auto-format the input as MM/YYYY
  const handleExpiryDateChange = (value: string) => {
    // Remove any non-numeric characters
    let formattedValue = value.replace(/\D/g, "");

    // Add a slash after the second digit (for MM part)
    if (formattedValue.length >= 3) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 6)}`;
    }

    // Limit input length to MM/YYYY (7 characters total)
    if (formattedValue.length > 7) {
      formattedValue = formattedValue.slice(0, 7);
    }
    setExpiryDate(formattedValue);

    // Extract and log the month and year separately
    const month = formattedValue.slice(0, 2);  // Extract the first two digits for month
    const year = formattedValue.slice(3);      // Extract the year part after the slash
    if (month) {
      handleCreditCardInputChange(
        month,
        setCreditCardExpiryMonth,
        validateExpiryMonth,
        "expiryMonth"
      )
    }

    if (year) {
      handleCreditCardInputChange(
        year,
        setCreditCardExpiryYear,
        validateExpiryYear,
        "expiryYear"
      )
    }
  };

  const queryClient = useQueryClient();
  const setShippingAddressMutation = useMutation({
    mutationFn: setShippingAddress,
    mutationKey: ["setShippingAddress"],
    onSuccess: async (data) => {
      if (selectedPaymentMethod === "authnetcim") {
        if (selectedCard === "New Card") {
          const { data } = await doApiRequest({
            securePaymentContainerRequest: {
              merchantAuthentication: {
                name: process.env.NEXT_PUBLIC_AUTHORIZE_CLIENT_NAME!,
                clientKey:
                  process.env.NEXT_PUBLIC_AUTHORIZE_CLIENT_KEY!,
              },
              data: {
                type: "TOKEN",
                id: process.env.NEXT_PUBLIC_AUTHORIZE_CLIENT_ID!,
                token: {
                  cardNumber: creditCardNumber?.replace(/\s+/g, ''),
                  expirationDate: `${creditCardExpiryMonth}${creditCardExpiryYear}`,
                  cardCode: creditCardCVC,
                },
              },
            },
          });

          const additional_data = {
            acceptjs_key: data?.opaqueData?.dataDescriptor,
            acceptjs_value: data?.opaqueData?.dataValue,
            cc_bin: `${creditCardNumber?.replace(/\s+/g, '')?.substring(0, 6)}`,
            cc_cid: `${creditCardCVC}`,
            cc_exp_month: `${creditCardExpiryMonth}`,
            cc_exp_year: `${creditCardExpiryYear}`,
            cc_last4: `${creditCardNumber?.replace(/\s+/g, '')?.slice(-4)}`,
            save: false,
          };
          const payloadToPass = {
            paymentMethod: {
              method: selectedPaymentMethod as string,
              additional_data,
              extension_attributes: { agreement_ids: ["1"] },
            },
          };

          setPaymentMethodMutation.mutate({
            ...payloadToPass,
          });
        } else {
          const paymentMethod = paymentMethodsData?.paymentMethods?.find((paymentMethodData: any) => paymentMethodData?.customerPaymentProfileId === selectedCard)
          const payloadToPass = {
            customerPaymentProfileId: `${paymentMethod?.customerPaymentProfileId}`
          };

          chargeCustomerMutation.mutate({
            ...payloadToPass,
          });
        }
      } else if (selectedPaymentMethod === "paypal_express") {
        const payloadToPass = {
          paymentMethod: {
            method: "paypal_express" as string,
            extension_attributes: {
              agreement_ids: ["1"],
            },
            additional_data: null,
            po_number: null
          },
        };
        // @ts-ignore
        setPaymentMethodMutation.mutate({
          ...payloadToPass,
        });
      } else {
        const payloadToPass = {
          paymentMethod: {
            method: selectedPaymentMethod as string,
            extension_attributes: { agreement_ids: ["1"] },
          },
        };
        setPaymentMethodMutation.mutate({
          ...payloadToPass,
        });
      }

      setLoading(false);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });
  const chargeCustomerMutation = useMutation({
    mutationFn: chargeCustomer,
    mutationKey: ["chargeCustomer"],
    onSuccess: async (data) => {
      const payloadToPass = {
        paymentMethod: {
          method: "checkmo" as string,
          extension_attributes: { agreement_ids: ["1"] },
        },
      };
      setPaymentMethodMutation.mutate({
        ...payloadToPass,
      });
      setLoading(false);
    },
    onError: (error) => {
      errorHandler(error);
    },
  });

  useEffect(() => {
    (async () => {
      await axios.get("https://js.authorize.net/v1/AcceptCore.js");
    })();
  }, []);

  const setPaymentMethodMutation = useMutation({
    mutationFn: setPaymentMethod,
    mutationKey: ["setPaymentMethod"],
    onError: (error) => {
      errorHandler(error);
    },
    onSuccess: (data) => {
      if (data?.data) {
        setLoading(false);
        createSubmission(data?.data)
        window.open(`https://store.audiomediagrading.com/webservices/print/?order=${data?.data}&key=9813y89cryn234ydn`, "_blank")
        queryClient?.invalidateQueries({ queryKey: ["customerCart"] });
        queryClient?.invalidateQueries({ queryKey: ["customerCartItems"] });
        toast.success(`Your Order is placed`);
        router.push(`/`);
      }
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    setSelectedPaymentMethod(code);
  };


  const { data: paymentMethodsData, isPending, error } = useQuery({
    queryKey: ["customerStoredPaymentMethods"],
    queryFn: getStoredPaymentMethods,
    refetchOnWindowFocus: true,
  });


  const addAddressMutation = useMutation({
    mutationFn: storePaymentMethod,
    onSuccess: (data) => {
      if (data?.status === 200) {
        queryClient.invalidateQueries({
          queryKey: ["customerStoredPaymentMethods"],
          refetchType: "all",
        })

      }
    },
    onError: (error) => {
      errorHandler(error)
    },
  })

  const handlePlaceOrder = () => {
    const selectedShipAddress = addresses?.find(
      (address) => address?.id === selectedShippingAddress
    );

    const selectedBillAddress = addresses?.find((address) => address?.id === selectedBillingAddress)

    if (!selectedShipAddress) {
      toast.error("Shipping Address is Required.");
      return;
    }
    if (!isBothAddressSame) {
      if (!selectedBillAddress) {
        toast.error("Billing Address is Required.")
        return;
      }
    }
    if (!selectedPaymentMethod) {
      toast.error("Payment Method is Required.");
      return;
    }

    if (selectedPaymentMethod === "authnetcim") {
      if (selectedCard === "New Card") {
        const cardNumberError = validateCardNumber(creditCardNumber);
        const expiryMonthError = validateExpiryMonth(creditCardExpiryMonth);
        const expiryYearError = validateExpiryYear(creditCardExpiryYear);
        const cvcError = validateCVC(creditCardCVC);

        if (cardNumberError || expiryMonthError || expiryYearError || cvcError) {
          setErrors({
            cardNumber: cardNumberError,
            expiryMonth: expiryMonthError,
            expiryYear: expiryYearError,
            cvc: cvcError,
          });
          return;
        }
      }
    }

    const {
      city,
      country_id,
      company,
      firstname,
      lastname,
      postcode,
      region: regionObj,
      region_id,
      street,
      telephone,
    } = selectedShipAddress;
    const { region_code, region } = regionObj;

    const shippingAddress = {
      city,
      country_id,
      company,
      firstname,
      lastname,
      postcode,
      region_id,
      region_code,
      region,
      street,
      telephone,
    };
    let billingAddress;
    if (!isBothAddressSame) {
      const {
        city: billingCity,
        country_id: billingCountryId,
        company: billingCompany,
        firstname: billingFirstName,
        lastname: billingLastName,
        postcode: billingPostCode,
        region: billingRegionObj,
        region_id: billingRegionId,
        street: billingStreet,
        telephone: billingTelephone } = selectedBillAddress!
      const { region_code: billingRegionCode, region: billingRegion } = billingRegionObj;

      billingAddress = {
        city: billingCity,
        country_id: billingCountryId,
        company: billingCompany,
        firstname: billingFirstName,
        lastname: billingLastName,
        postcode: billingPostCode,
        region_id: billingRegionId,
        region_code: billingRegionCode,
        region: billingRegion,
        street: billingStreet,
        telephone: billingTelephone,
      };
    }

    const addressObj = {
      addressInformation: {
        shipping_address: shippingAddress,
        billing_address: isBothAddressSame ? shippingAddress : billingAddress,
        shipping_method_code: "flatrate",
        shipping_carrier_code: "flatrate",
      },
    };
    setLoading(true);
    if (saveCreditCard) {
      const { addressInformation: { billing_address, shipping_address } } = addressObj;
      const { firstname, lastname, street, country_id, telephone, postcode, city, region } = billing_address || shipping_address;

      const regionToPass = { region_id: selectedBillAddress?.region?.region_id?.toString(), region: selectedBillAddress?.region?.region }
      const objectToPass = { creditCardNumber, creditCardCvc: creditCardCVC, creditCardExpiryMonth, creditCardExpiryYear, firstname, lastname, street: [street?.[0], street?.[1]] as [string, string | undefined], country_id, telephone, postcode, city, region: regionToPass }


      addAddressMutation?.mutate(objectToPass)
    }
    setShippingAddressMutation.mutate(addressObj);
  };

  return (
    <div className=" flex flex-col gap-4 pb-4 border-b border-[#DEDEDE]">
      <div>
        <h1 className="font-semibold text-xl">Payment Method</h1>
        <p className="text-[#707070] text-sm">All transactions are secure and encrypted</p>
      </div>
      <ul>
        {paymentMethods?.filter((paymentMethod) => paymentMethod?.code !== "paypal_express_bml" && paymentMethod?.code !== "paypal_express")?.map((paymentMethod) => (
          <li
            key={paymentMethod?.code}
            className={`flex flex-col gap-4`}
          >
            <div className={`flex gap-4 w-full items-center border-2 rounded-lg md:px-4 ${selectedPaymentMethod === paymentMethod?.code ? "border-[#9747FF] px-4 py-2 md:py-4 bg-[#C6ABFF1A]" : "py-2 border-transparent"}`}>
              <input
                className={"w-4 h-4 accent-[#9747FF]"}
                type="radio"
                name="paymentMethod"
                value={paymentMethod?.code}
                id={paymentMethod?.code}
                onChange={handleChange}
              />
              <label htmlFor={paymentMethod?.code} className="text-base md:text-lg">
                {paymentMethod?.title}
              </label>
            </div>
            {selectedPaymentMethod === paymentMethod?.code && (
              <div className="px-3.5 md:px-4 w-full">
                {paymentMethod?.code === "checkmo" && (
                  <div className="border-b w-full border-[#DEDEDE] py-2 md:py-3">
                    <ul className="space-y-1 md:space-y-2">
                      <li>
                        <h1 className="text-base font-medium">
                          Make Check payable to:
                        </h1>
                        <p className="text-sm">Audio Media Grading</p>
                      </li>
                      <li>
                        <h1 className="text-base ">Send Check to:</h1>
                        <p className="text-sm">
                          2257 Vista Parkway
                          {"\n"}
                          Unit 15
                          {"\n"}
                          West Palm Beach, FL 33411
                        </p>
                      </li>


                      <li>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-[18px] rounded-lg h-[18px] accent-[#9747FF]"
                            id="bothAddressAreSame"
                            checked={isBothAddressSame}
                            onChange={(e) => {
                              setIsBothAddressSame(e?.target?.checked)
                            }}
                          />
                          <label
                            htmlFor="bothAddressAreSame"
                            className="text-sm font-normal"
                          >
                            My billing and shipping address are the same
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {paymentMethod?.code === "authnetcim" && (
                  <div className="border-b w-full border-[#DEDEDE] py-2 md:py-3 ">
                    <ul className="space-y-4">
                      <li>
                        <select onChange={(e) => {
                          setSelectedCard(e?.target?.value)
                        }} className="w-full border py-3 px-2.5 flex items-center bg-transparent  border-[#DEDEDE] rounded-md relative
">
                          <option value={"New Card"}>New Card</option>
                          {
                            paymentMethodsData?.paymentMethods?.map((paymentMethod: any) => <option value={paymentMethod?.customerPaymentProfileId} key={paymentMethod?.customerPaymentProfileId}>**** **** **** {paymentMethod?.payment?.creditCard?.cardNumber?.slice(-4)}</option>)
                          }
                        </select>
                      </li>
                      {
                        selectedCard === "New Card" &&
                        <li>
                          <div className="space-y-2 md:space-y-4">
                            <div className={`border py-3 px-2.5 flex items-center  border-[#DEDEDE] rounded-md relative
                            ${errors.cardNumber?.length && "border-red-500"}
                            `}>
                              <input
                                type="text"
                                id="creditCardNumber"
                                placeholder="Card Number"
                                className="flex-1 bg-transparent rounded"
                                value={creditCardNumber}
                                maxLength={19} // Restricting to 16 characters
                                onChange={(e) =>
                                  handleCreditCardInputChange(
                                    formatCreditCardNumber(e.target.value),
                                    setCreditCardNumber,
                                    validateCardNumber,
                                    "cardNumber"
                                  )
                                }
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={19}
                                height={18}
                                fill="none"
                              >
                                <path
                                  stroke="#707070"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.4}
                                  d="M5 8.1c0-2.955 1.454-6.3 4.5-6.3 3.045 0 4.5 3.345 4.5 6.3m-10.8.604v6.891c0 .334.27.605.603.605h11.392c.334 0 .604-.27.604-.604V8.703a.604.604 0 0 0-.604-.604H3.803a.604.604 0 0 0-.604.604Z"
                                />
                              </svg>
                            </div>
                            <div className="flex flex-col md:flex-row items-center gap-2">
                              <div className={`border w-full gap-1 flex-1 py-3 px-2.5 flex items-center  border-[#DEDEDE] rounded-md relative
                            ${errors?.expiryMonth?.length && "border-red-500"}
                            ${errors?.expiryYear?.length && "border-red-500"}
                            `}>
                                <input
                                  type="text"
                                  placeholder="Expiration date (DD/YYYY)"
                                  className="bg-transparent relative z-10 w-full rounded"
                                  id="creditCardExpiry"
                                  value={`${expiryDate}`} // Update to reflect the day
                                  onChange={(e) => handleExpiryDateChange(e.target.value)}

                                  maxLength={7}
                                />

                              </div>
                              <div className={`border w-full flex-1 py-3 px-2.5 flex items-center  border-[#DEDEDE] rounded-md relative
                            ${errors?.cvc?.length && "border-red-500"}
                            `}>
                                <input
                                  type="text"
                                  placeholder="CVC"
                                  className="flex-1 bg-transparent rounded"
                                  id="creditCardCVC"
                                  maxLength={4}
                                  value={creditCardCVC}
                                  onChange={(e) =>
                                    handleCreditCardInputChange(
                                      e.target.value,
                                      setCreditCardCVC,
                                      validateCVC,
                                      "cvc"
                                    )
                                  }
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={19}
                                  height={18}
                                  fill="none"
                                >
                                  <circle cx={9.501} cy={9.001} r={7.2} stroke="#707070" strokeWidth={1.4} />
                                  <path
                                    stroke="#707070"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.4}
                                    d="M7.7 6.557c.256-1.671 3.342-1.671 3.6 0C11.555 8.23 9.434 8.23 9.434 9.58M9.506 12.6H9.5v.006h.006V12.6Z"
                                  />
                                  <circle cx={9.5} cy={12.471} r={0.129} stroke="#707070" strokeWidth={1.4} />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </li>
                      }

                      {
                        selectedCard === "New Card" &&
                        <li>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="w-[18px] rounded-lg h-[18px] accent-[#9747FF]"
                              id="saveCreditCard"
                              checked={saveCreditCard}
                              onChange={(e) => {
                                setSaveCreditCard(e?.target?.checked)
                              }}
                            />
                            <label
                              htmlFor="saveCreditCard"
                              className="text-sm font-normal"
                            >
                              Save Credit Card
                            </label>
                          </div>
                        </li>
                      }
                      <li>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-[18px] rounded-lg h-[18px] accent-[#9747FF]"
                            id="bothAddressAreSame"
                            checked={isBothAddressSame}
                            onChange={(e) => {
                              setIsBothAddressSame(e?.target?.checked)
                            }}
                          />
                          <label
                            htmlFor="bothAddressAreSame"
                            className="text-sm font-normal"
                          >
                            My billing and shipping address are the same
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                {paymentMethod?.code === "paypal_express" && (
                  <div className="border-b w-full border-[#DEDEDE] py-2 md:py-3 ">
                    <ul className="space-y-4">
                      <li>
                        <h1> {paymentMethod?.code}</h1>
                      </li>
                      <li>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="w-[18px] rounded-lg h-[18px] accent-[#9747FF]"
                            id="bothAddressAreSame"
                            checked={isBothAddressSame}
                            onChange={(e) => {
                              setIsBothAddressSame(e?.target?.checked)
                            }}
                          />
                          <label
                            htmlFor="bothAddressAreSame"
                            className="text-sm font-normal"
                          >
                            My billing and shipping address are the same
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3.5">
        <h1 className="text-base font-semibold ">Remember Me</h1>
        <div className="flex items-center px-4 bg-[#EBEAE2] rounded-lg py-2.5 gap-2">
          <input
            type="checkbox"
            className="w-3.5 h-3.5 accent-[#9747FF]"
            id="iAgreeWithTerms"
            checked={agreeWithTerms}
            onChange={handleAgreeWithTermsChange}
          />
          <label
            htmlFor="iAgreeWithTerms"
            className="text-sm font-normal"
          >
            I agree to the AMG Terms & Conditions
          </label>
        </div>
      </div>
      <button
        onClick={handlePlaceOrder}
        disabled={
          !agreeWithTerms ||
          setShippingAddressMutation?.isPending ||
          setPaymentMethodMutation?.isPending
        }
        className={
          `w-full rounded-full border  flex items-center justify-center px-2 py-4
          ${!agreeWithTerms || setShippingAddressMutation?.isPending || setPaymentMethodMutation?.isPending ? "!bg-[#25242233] !text-[#FFFFFF] !border-[#25242233]" : "border-theme-black text-white bg-black"}
          `
        }
      >
        <p className={"font-theme-font-roman"}>
          {loading ? <WhiteAnimation /> : "Place Order"}
        </p>
      </button>
    </div>
  );
};

export default PaymentMethods;