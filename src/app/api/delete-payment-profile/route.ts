import { CURRENT_CUSTOMER, CUSTOMER_PROFILE_ID, DELETE_PRODUCT_FROM_CART } from "@/http/endpoints";
import getServerAuthSession from "@/lib/auth";
import { formatAxiosError } from "@/lib/utils";
import { APIContracts, APIControllers, Constants } from "authorizenet";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerAuthSession()
        const { data } = await axios.get(CURRENT_CUSTOMER, {
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const { data: profileIdData } = await axios.get(`${CUSTOMER_PROFILE_ID}?function=lookup&id=${data?.id}&key=AMG123!`)

        const { paymentProfileId } = await req.json()

        const merchantAuthentication = new APIContracts.MerchantAuthenticationType();
        merchantAuthentication.setName(process.env.NEXT_PUBLIC_AUTHORIZE_APP_LOGIN_ID!);
        merchantAuthentication.setTransactionKey(process.env.NEXT_PUBLIC_AUTHORIZE_TRANSACTION_KEY!);

        var deleteRequest = new APIContracts.DeleteCustomerPaymentProfileRequest();
        deleteRequest.setMerchantAuthentication(merchantAuthentication);
        deleteRequest.setCustomerProfileId(profileIdData?.SUCCESS);
        deleteRequest.setCustomerPaymentProfileId(paymentProfileId);


        const executeAsync = () => {
            return new Promise((resolve, reject) => {
                const controller = new APIControllers.DeleteCustomerPaymentProfileController(deleteRequest.getJSON());
                controller.setEnvironment(Constants?.endpoint?.production)
                controller.execute(() => {
                    const apiResponse = controller.getResponse();
                    const response = new APIContracts.DeleteCustomerPaymentProfileResponse(apiResponse);

                    if (response !== null && response.getMessages().getResultCode() === APIContracts.MessageTypeEnum.OK) {
                        resolve(`Payment profile ${paymentProfileId} deleted successfully.`);
                    } else {
                        reject(new Error(response.getMessages().getMessage()[0].getText())); // Reject with error message
                    }
                });
            });
        };

        const result = await executeAsync();

        return NextResponse.json({ data: result });
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