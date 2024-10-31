import Image from "next/image"
import {
    AccuracyIcon,
    CameraIcon,
    CaseIcon,
    DollarIcon,
    LocationIcon,
    MedalIcon, ProtectionIcon, SerialNumberIcon,
    SheildIcon,
    StartIcon, WalletIcon
} from "@/components/icons";

export const aboutHighLights = [
    {
        title: "Third-party authentication and condition appraisal",
        description: "Our goal at AMG is to increase the level of trust across our collecting community. The label created for each piece is an honest and objective representation of the item’s condition – providing collectors and investors with confidence and eliminating the frustrations of buying pieces sight unseen.",
        image: () => <Image src={"/images/about-1.png"} alt={"about"} width={700} height={700} className={"w-full md:!w-1/2"}/>
    },
    {
        title: "Commitment to \n transparency",
        description: "We follow a strict set of protocols and procedures to ensure each item is inspected without bias or prejudice. Our team is trained to follow our extensive authentication and grading standards. To read more about our grading scale, see here.",
        image: () => <Image src={"/images/about-2.png"} alt={"about"} width={700} height={700} className={"w-full md:!w-1/2"}/>
    },
    {
        title: "World-class customer service",
        description: "Customer service and communication is a fundamental ingredient of our business model. From the time your shipment arrives in our receiving department, our proprietary technology tracks your order as it makes its way through authentication, grading, fabrication, photography and finally, shipment back to you. You will always know the status of your submission and if you have any questions, our staff will provide you with prompt, courteous, and professional service – we’re always just an email away at info@audiomediagrading.com.",
        image: () => <Image src={"/images/about-2.png"} alt={"about"} width={700} height={700} className={"w-full md:!w-1/2"}/>
    },
    {
        title: "We’ll take care of your grails.",
        description: "Trust us – we know it can be nerve-wracking to send us your prized possessions. We’ve partnered with BCW to offer protective shipping supplies (link). In addition, we offer comprehensive insurance coverage in the rare and unlikely event your piece is damaged. Finally, we’ve invested in a state-of-the-art, safe and secure facility to ensure your submission is safe when it’s in our hands.",
        image: () => <Image src={"/images/about-2.png"} alt={"about"} width={700} height={700} className={"w-full md:!w-1/2"}/>
    }
]

export const whyUseData = [
    {
        icon: () => <LocationIcon />,
        title: "Premier Grading Standard",
        description: "Unbiased, proprietary grading scale that allows you to confidently understand the condition of an item."
    },
    {
        icon: () => <AccuracyIcon />,
        title: "Accuracy & Consistency",
        description: "Our triple-check system ensures precise grades: three experts independently use advanced tools to assess and weight each blemish, guaranteeing the highest accuracy and reliability for buyers and sellers."
    },
    {
        icon: () => <StartIcon />,
        title: "Industry-leading slabs",
        description: "Patent-pending sonic welded slabs – including the only sonic welded cassette case in the industry – offer unparalleled protection."
    },
    {
        icon: () => <CaseIcon />,
        title: "Endless case options – truly",
        description: "Our acrylic fabricators have an eye for design and a passion for clean edges and flawless seams. With the combination of their experience and skill and our state-of-the-art advanced laser-cutting machine, AMG-graded collectibles achieve true museum-quality display."
    },
    {
        icon: () => <CameraIcon />,
        title: "Photograph & SOA",
        description: "Every item submitted for documentation and archiving includes a professional digital image and a Statement of Archival (SOA) at no extra charge. Each  SOA is stamped and signed by a corporate officer, with a matching serial-numbered hologram."
    },
    {
        icon: () => <SerialNumberIcon />,
        title: "Serial Number & QR Code",
        description: "Serial numbers and QR codes are vital for documenting and archiving collectibles. AMG prominently displays them on the bottom of every descriptive label, allowing for quick verification of the item's description, condition, and serial numbers with a simple scan."
    },
    {
        icon: () => <ProtectionIcon />,
        title: "Protective Shipping",
        description: "AMG goes the extra mile to assure your cherished collectibles arrive quickly, safely and in the same condition that they leave our shipping department."
    },
    {
        icon: () => <WalletIcon />,
        title: "Interested in selling?",
        description: "We’re here to help. Data shows that graded pieces sell for 6x higher than raw copies. We partner with all the major auction houses and can send submissions directly to a marketplace saving you the shipping and logistics hassle."
    }
]
