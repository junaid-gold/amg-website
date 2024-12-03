import axios from "axios";

export const contactUs = async (payload: { email: string, phone: string, name: string, message: string }) => {
    const { data } = await axios.post("/api/contact-us", payload);

    return data;
};