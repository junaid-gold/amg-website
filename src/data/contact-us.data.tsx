import {EmailIcon, PhoneIcon} from "@/components/icons";

export const contactDetails = [
    {
        icon: () => <PhoneIcon />,
        heading: "Phone",
        details: "(866) 264-0001"
    },
    {
        icon: () => <EmailIcon />,
        heading: "Email",
        details: "info@audiomediagrading.com"
    },
    {
        icon: () => <EmailIcon />,
        heading: "Address",
        details: "2257 Vista Parkway, Unit 15, West Palm Beach, FL 33411"
    }
]
