
import { Address, Country } from "@/types";
import EditAddress from "./edit-address";

interface BillingAddressProps {
  countries: Country[];
  billingAddress: Address,
  className?: string,
  headerTitle?: string
}

const BillingAddress = ({ countries, billingAddress, className, headerTitle }: BillingAddressProps) => {
  return (

    <div className={`p-6 sm:p-10 bg-theme-gray flex-1 rounded-3xl ${className && className}`}>

      <h3 className={"font-theme-font-medium text-[24px]"}>{headerTitle || "Default Billing Address"}</h3>
      <div className={"flex flex-col  mt-4 gap-2"}>
        {Array.isArray(billingAddress) ? (
          !billingAddress?.length && null
        ) : (
          <>
            {billingAddress && (
              <>
                <p>
                  {billingAddress?.firstname} {billingAddress?.lastname}
                  {"\n"}
                  {billingAddress?.company ? <>{billingAddress?.company} {"\n"}</> : null}

                  {billingAddress?.street?.[0]} {billingAddress?.street?.[1] ? `, ${billingAddress?.street?.[1]}` : null}
                  {"\n"}
                  {billingAddress?.city}, {billingAddress?.region?.region}
                  {billingAddress?.postcode}
                  {"\n"}
                  {billingAddress?.country_id}
                  {"\n"}
                  T: {billingAddress?.telephone}
                  {"\n"}
                </p>
              </>
            )}
            <div className={"flex gap-4"}>
              <EditAddress
                countries={countries}
                address={billingAddress}
                addressType="Billing"
              />
            </div>
          </>
        )}
      </div>
    </div>

  );
};

export default BillingAddress;
