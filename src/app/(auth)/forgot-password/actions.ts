import axios from "axios";

export const forgetPassword = async (payload: {
    email: string
}) => {
    return await axios.put("/api/forgot-password", { email: payload?.email, template: "email_reset" })
};
