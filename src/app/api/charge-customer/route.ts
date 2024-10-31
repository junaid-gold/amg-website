import { CART_MINE_TOTAL, CURRENT_CUSTOMER, CUSTOMER_PROFILE_ID } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { APIContracts, APIControllers, Constants } from "authorizenet";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession();
        const { data: cartData } = await axios.get(CART_MINE_TOTAL, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            }
        });

        const grandTotal = cartData?.total_segments?.find((segment: { code: string; }) => segment?.code === "grand_total")
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const { payload } = await req.json();
        const merchantAuthentication = new APIContracts.MerchantAuthenticationType();
        merchantAuthentication.setName(process.env.NEXT_PUBLIC_AUTHORIZE_APP_LOGIN_ID!);
        merchantAuthentication.setTransactionKey(process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY!);

        // Get the customer profile ID from your database or Authorize.Net
        const { data: profileIdData } = await axios.get(`${CUSTOMER_PROFILE_ID}/?function=lookup&id=${data?.id}&key=AMG123!`, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const profileToCharge = new APIContracts.CustomerProfilePaymentType();
        profileToCharge.setCustomerProfileId(`${profileIdData?.SUCCESS}`);

        const paymentProfile = new APIContracts.PaymentProfile();
        paymentProfile.setPaymentProfileId(payload?.customerPaymentProfileId); // Set the saved payment profile ID

        profileToCharge.setPaymentProfile(paymentProfile);

        const transactionRequestType = new APIContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION); // Charge the card
        transactionRequestType.setProfile(profileToCharge); // Use the profile that already has billing information
        transactionRequestType.setAmount(grandTotal?.value); // Set the amount to be charged

        const createRequest = new APIContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthentication);
        createRequest.setTransactionRequest(transactionRequestType);

        // Function to handle transaction execution
        const executeAsync = () => {
            return new Promise((resolve, reject) => {
                const controller = new APIControllers.CreateTransactionController(createRequest.getJSON());
                controller.setEnvironment(Constants?.endpoint?.production);
                controller.execute(() => {
                    const apiResponse = controller.getResponse();
                    const response = new APIContracts.CreateTransactionResponse(apiResponse);
                    if (response !== null && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                        const errorMessages = (response.getTransactionResponse()?.getErrors()?.getError())
                        if (errorMessages?.length > 0) {
                            reject(new Error(errorMessages[0]?.errorText))
                        }
                        resolve(response.getTransactionResponse());
                    } else {
                        const errorMessages = response.getTransactionResponse()?.getErrors()?.getError();
                        if (errorMessages) {
                            reject(new Error(errorMessages[0].getErrorText()));
                        } else {
                            reject(new Error("Transaction failed due to an unknown error."));
                        }
                    }
                });
            });
        };

        // Execute transaction
        const transactionResponse = await executeAsync();

        return NextResponse.json({ data: transactionResponse });
    } catch (error) {

        if (axios.isAxiosError(error)) {
            const { status, message } = formatAxiosError(error);
            return new Response(JSON.stringify({ message }), {
                status,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // @ts-ignore
            return new Response(JSON.stringify({ message: error?.message || 'An unknown error occurred' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
}
