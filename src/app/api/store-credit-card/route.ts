import { CURRENT_CUSTOMER, CUSTOMER_PROFILE_ID, SET_SHIPPING_ADDRESS } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { APIContracts, APIControllers, Constants } from "authorizenet"


export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });


        const { creditCardNumber, creditCardCvc: cardCode, creditCardExpiryMonth, creditCardExpiryYear, firstname, lastname, street, country_id, telephone, postcode, city, region } = await req.json()
        const cardNumber = creditCardNumber?.replace(/\s+/g, '')
        const expirationDate = `${creditCardExpiryYear}-${creditCardExpiryMonth}`

        const merchantAuthentication = new APIContracts.MerchantAuthenticationType();

        merchantAuthentication.setName(process.env.NEXT_PUBLIC_AUTHORIZE_APP_LOGIN_ID!);
        merchantAuthentication.setTransactionKey(process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY!);

        const { data: profileIdData } = await axios.get(`${CUSTOMER_PROFILE_ID}/?function=lookup&id=${data?.id}&key=AMG123!`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (profileIdData?.SUCCESS) {
            const creditCard = new APIContracts.CreditCardType();

            creditCard.setCardNumber(cardNumber);
            creditCard.setExpirationDate(expirationDate);
            creditCard.setCardCode(cardCode);

            const paymentType = new APIContracts.PaymentType();
            paymentType.setCreditCard(creditCard);

            const customerPaymentProfile = new APIContracts.CustomerPaymentProfileType();
            customerPaymentProfile.setPayment(paymentType);

            var customerAddress = new APIContracts.CustomerAddressType();
            customerAddress.setFirstName(firstname);
            customerAddress.setLastName(lastname);
            customerAddress.setAddress(street?.[0]);
            customerAddress.setCity(city);
            customerAddress.setState(region?.region || region?.id);
            customerAddress.setZip(postcode);
            customerAddress.setCountry(country_id);
            customerAddress.setPhoneNumber(telephone);

            customerPaymentProfile.setBillTo(customerAddress)

            var createRequest = new APIContracts.CreateCustomerPaymentProfileRequest();

            createRequest.setMerchantAuthentication(merchantAuthentication);
            createRequest.setCustomerProfileId(`${profileIdData?.SUCCESS}`);
            createRequest.setPaymentProfile(customerPaymentProfile);

            const executeAsync = () => {
                return new Promise((resolve, reject) => {
                    const controller = new APIControllers.CreateCustomerProfileController(createRequest.getJSON());
                    controller.setEnvironment(Constants?.endpoint?.production)
                    controller.execute(() => {
                        const apiResponse = controller.getResponse();
                        const response = new APIContracts.CreateCustomerProfileResponse(apiResponse);
                        if (response !== null && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                            resolve(response.getCustomerProfileId()); // Resolve with customerProfileId
                        } else {
                            reject(new Error(response.getMessages().getMessage()[0].getText())); // Reject with error message
                        }
                    });
                });
            };

            // Await the response of the executeAsync function
            const customerProfileId = await executeAsync();

            return NextResponse.json({ customerProfileId: customerProfileId })

        } else {
            const creditCard = new APIContracts.CreditCardType();

            creditCard.setCardNumber(cardNumber);
            creditCard.setExpirationDate(expirationDate);
            creditCard.setCardCode(cardCode);

            const paymentType = new APIContracts.PaymentType();
            paymentType.setCreditCard(creditCard);

            const customerPaymentProfile = new APIContracts.CustomerPaymentProfileType();
            customerPaymentProfile.setPayment(paymentType);

            var customerAddress = new APIContracts.CustomerAddressType();
            customerAddress.setFirstName(firstname);
            customerAddress.setLastName(lastname);
            customerAddress.setAddress(street?.[0]);
            customerAddress.setCity(city);
            customerAddress.setState(region?.region || region?.id);
            customerAddress.setZip(postcode);
            customerAddress.setCountry(country_id);
            customerAddress.setPhoneNumber(telephone);

            customerPaymentProfile.setBillTo(customerAddress)

            const customerProfile = new APIContracts.CustomerProfileType();

            // const merchantCustomerId = data?.id;
            customerProfile.setMerchantCustomerId(data?.id?.toString()?.substring(0, 20)); // Store this profile ID in your database
            customerProfile.setPaymentProfiles([customerPaymentProfile]);

            const createRequest = new APIContracts.CreateCustomerProfileRequest();
            createRequest.setMerchantAuthentication(merchantAuthentication);
            createRequest.setProfile(customerProfile);


            // Wrap the controller.execute() inside a Promise
            const executeAsync = () => {
                return new Promise((resolve, reject) => {
                    const controller = new APIControllers.CreateCustomerProfileController(createRequest.getJSON());
                    controller.setEnvironment(Constants?.endpoint?.production)
                    controller.execute(() => {
                        const apiResponse = controller.getResponse();
                        const response = new APIContracts.CreateCustomerProfileResponse(apiResponse);
                        if (response !== null && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                            resolve(response.getCustomerProfileId()); // Resolve with customerProfileId
                        } else {
                            reject(new Error(response.getMessages().getMessage()[0].getText())); // Reject with error message
                        }
                    });
                });
            };

            // Await the response of the executeAsync function
            const customerProfileId = await executeAsync();

            await axios.post(`${CUSTOMER_PROFILE_ID}?function=save&id=${data?.id}&acid=${customerProfileId}`)

            return NextResponse.json({ customerProfileId })
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const { status, message } = formatAxiosError(error)
            return new Response(JSON.stringify({ message }), {
                status,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            return new Response(JSON.stringify({ message: 'An unknown error occurred' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    }
}
