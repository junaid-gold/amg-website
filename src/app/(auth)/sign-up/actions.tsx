import { COUNTRIES, GET_ATTRIBUTE_DETAILS } from "@/http/endpoints";
import { SignUpFormSchemaType } from "@/validations/sign-up.validation";
import axios from "axios";

export const getCountries = async () => {
  const { data } = await axios.get(COUNTRIES);

  return data;
};

export const getAttributes = async () => {
  const { data } = await axios.get(`${GET_ATTRIBUTE_DETAILS}/referral`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAGENTO_ACCESS_TOKEN}`,
    },
  });

  return data;
};

export const createCustomer = async (payload: SignUpFormSchemaType) => {
  const { data } = await axios.post("/api/create-customer", {
    customer: payload.customer,
    password: payload.password,
  });

  return data;
};
