import axios from "axios";

export const resetPassword = async (payload: {
    email: string,
    newPassword: string,
    resetToken: string
}) => {
    return await axios.post("/api/reset-password", payload)
};
