"use client"
import React, { useState } from 'react'
import { ContactType } from '@/types'
import { contactDetails } from "@/data/contact-us.data"
import toast from 'react-hot-toast'
import BlackAnimation from '@/components/black-animation'
import emailjs from '@emailjs/browser';

interface FormProps {
    contactData: ContactType
}

const Form = ({ contactData }: FormProps) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e?.target?.name]: e?.target?.value
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const { name, phone, message, email } = formData

        const templateParams = {
            name, phone, message, email
        }
        emailjs
            .send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, templateParams, {
                publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
            })
            .then(
                (response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    toast.success(`Thank you for contacting us!`);

                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: ""
                    })
                    setLoading(false)
                },
                (err) => {
                    console.log('FAILED...', err);

                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        message: ""
                    })
                    setLoading(false)

                },
            );

    }
    return (

        <form onSubmit={handleSubmit} className={"mt-6 flex flex-col gap-5"}>
            <input name='name' required onChange={(e) => handleOnChange} className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray `} placeholder={contactData?.inputPlaceHolderOne} />
            <input name='email' required onChange={handleOnChange} type='email' className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray `} placeholder={contactData?.inputPlaceHolderTwo} />
            <input type='number' required onChange={handleOnChange} name='phone' className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray `} placeholder={contactData?.inputPlaceHolderThree} />
            <textarea name='message' required onChange={handleOnChange} placeholder="Message" className={`rounded-lg px-5 py-3 border border-[#B6B4A2] text-[#100F0F] opacity-60 bg-theme-gray `}
            ></textarea>
            <button
                type={"submit"}
                className={
                    "w-full lg:w-1/2 rounded-full border border-theme-black text-theme-black bg-transparent px-6 py-3"
                }
                disabled={loading}
            >
                <p className={"font-theme-font-roman flex items-center justify-center"}>

                    {loading ? (
                        <BlackAnimation />
                    ) : (
                        "Send a Message"
                    )}</p>
            </button>
            <div
                className={"flex mt-6 flex-col md:flex-row gap-4 w-full"}
            >
                {contactDetails.map((details, key) => (
                    <div
                        key={details.heading}
                        className={`flex gap-4 ${key === 0 ? "w-[65%]" : "w-full"
                            }`}
                    >
                        <div className={"w-[28px] h-[28px]"}>
                            {details.icon()}
                        </div>
                        <div>
                            <p
                                className={
                                    "uppercase font-theme-font-medium text-sm"
                                }
                            >
                                {details.heading}
                            </p>
                            <p
                                className={
                                    "font-theme-font-light text-sm break-all"
                                }
                            >
                                {details?.heading === "Phone" && contactData?.phone}
                                {details?.heading === "Email" && contactData?.email}
                                {details?.heading === "Address" &&
                                    contactData?.address}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </form>
    )
}

export default Form