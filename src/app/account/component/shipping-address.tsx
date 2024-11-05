import { Address, Country } from "@/types";
import EditAddress from "./edit-address";

interface ShippingAddressProps {
  countries: Country[];
  shippingAddress: Address | [];
  className?: string
  headerTitle?: string
}

const ShippingAddress = ({ countries, shippingAddress, className, headerTitle }: ShippingAddressProps) => {
  return (
    <div className={`p-6 sm:p-10 bg-theme-gray flex-1 rounded-3xl ${className && className}`}>

      <h3 className={"font-theme-font-medium text-[24px]"}>{headerTitle || "Default Shipping Address"}</h3>
      <div className={"flex flex-col mt-4 gap-2"}>
        {Array.isArray(shippingAddress) ? (
          !shippingAddress?.length && null
        ) : (
          <>
            <p>
              {shippingAddress?.firstname} {shippingAddress?.lastname}

              {"\n"}
              {shippingAddress?.company ? <>{shippingAddress?.company} {"\n"}</> : null}
              {shippingAddress?.street?.[0]}{shippingAddress?.street?.[1] ? `, ${shippingAddress?.street?.[1]}` : null}
              {"\n"}
              {shippingAddress?.city}, {shippingAddress?.region?.region} {", "}
              {shippingAddress?.postcode}
              {"\n"}
              {shippingAddress?.country_id}
              {"\n"}
              T: {shippingAddress?.telephone}
              {"\n"}
            </p>
            <div className={"flex gap-4"}>
              <EditAddress
                countries={countries}
                address={shippingAddress}
                addressType="Shipping"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingAddress;
