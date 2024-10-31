import {DollarIcon, MedalIcon, SheildIcon, StartIcon} from "@/components/icons";

export const gradesData = [
    {
        icon: () => <MedalIcon />,
        title: "Trust",
        description: "AMG guarantees the authenticity of items encapsulated in our case."
    },
    {
        icon: () => <SheildIcon />,
        title: "Protect",
        description: "Tamper-resistant case with museum-grade acrylic that protects from 99% of harmful UV light."
    },
    {
        icon: () => <StartIcon />,
        title: "Premier Grading Standard",
        description: "Unbiased, proprietary grading scale that allows you to confidently understand the condition of an item."
    },
    {
        icon: () => <DollarIcon />,
        title: "Value",
        description: "Encapsulating and grading ensures the highest value for the prized pieces in your collection."
    }
]

export const howItWorks = [
    {
        title: "Create an account",
        description: "Just provide some basic information, and you'll gain access to our comprehensive grading and preservation services."
    },
    {
        title: "Submit your order",
        description: ".Select the types of media you want to preserve, and choose from our range of services. Our user-friendly interface will guide you through the process, ensuring you get exactly what you need."
    },
    {
        title: "Print the packing slip",
        description: "You'll receive a confirmation email with a packing slip. Print this slip and include it in your package. The packing slip helps us identify your items and ensures they receive the correct treatment."
    },
    {
        title: "Ship it!",
        description: "Carefully pack your audio media and ship it to us using your preferred shipping method. We recommend purchasing insurance to ensure your items arrive safely. Once we receive your package, our team of experts will get to work."
    }
]

export const highlights = [
    {
        title: "Vinyl",
        isButton: true,
        buttonLabel: "Submit a vinyl",
        image: "/images/homepage-1.png",
        bgColor: "bg-[#252422]"
    },
    {
        title: "CDs",
        isButton: true,
        buttonLabel: "Submit a CD",
        image: "/images/homepage-2.png",
        bgColor: "bg-[#8DE1F3]"
    },
    {
        title: "8-Tracks",
        isButton: true,
        buttonLabel: "Submit a 8-Track",
        image: "/images/homepage-3.png",
        bgColor: "bg-[#FFB1F3]"
    },
    {
        title: "Cassettes",
        isButton: true,
        buttonLabel: "Submit a cassette",
        image: "/images/homepage-4.png",
        bgColor: "bg-[#48BF71]"
    }
]
