import {
    AuthenticIcon,
    CassetteIcon,
    CDIcon,
    FirstPressingIcon, OpenedIcon,
    SealedIcon,
    SignatureIcon,
    TrackIcon,
    VinylIcon
} from "@/components/icons";
import Image from "next/image";

export const typeData = [
    {
        title: "Vinyl",
        icon: () => <div className={"mr-[2%] lg:mr-[1%]"}><VinylIcon /></div>
    },
    {
        title: "CD",
        icon: () => <div className={"mr-[2%] lg:mr-[1%]"}><CDIcon /></div>
    },
    {
        title: "Cassette",
        icon: () => <div><CassetteIcon /></div>
    },
    {
        title: "8-Track",
        icon: () => <div className={"mr-[2%] lg:mr-[1%]"}><TrackIcon /></div>
    }
]

export const variationData = [
    {
        title: "Signature",
        icon: () => <SignatureIcon/>,
        color: () => <Image src={"/icon/golden.svg"} alt={"golden"} width={13} height={55}/>
    },
    {
        title: "First Pressing",
        icon: () => <FirstPressingIcon/>,
        color: () => <div className={"bg-[#C6ABFF] h-[55px] w-[13px]"}/>
    },
    {
        title: "Sealed",
        icon: () => <SealedIcon/>,
        color: () => <div className={"bg-[#FF6262] h-[55px] w-[13px]"}/>
    },
    {
        title: "Opened",
        icon: () => <OpenedIcon/>,
        color: () => <div className={"bg-[#A3DE59] h-[55px] w-[13px]"}/>
    },
    {
        title: "Authentic",
        icon: () => <AuthenticIcon/>,
        color: () => <div className={"bg-[#C4CBD4] h-[55px] w-[13px]"}/>
    }
]

export const archiveData = [
    {
        title: "Loose / Opened Media",
        subTitle: "Any audio media product that is not in sealed factory packaging",
        description: "AMG will not accept restored items that may have permanent additions to an item, including, but not limited to, (i) after-market ink used to cover defects. (ii) alterations to any part of media item.",
        bgColor: "bg-[#48BF71]"
    },
    {
        title: "Sealed Media",
        subTitle: "Any audio media product that is factory sealed. The seal must be original. If resealed, it may be considered for refusal.",
        description: "AMG will not accept (i) restored items that used permanent ink to cover creases, chips, sticker tears, etc., (ii) glue used to reseal factory packaging, restore proof of purchases, etc., or (iii) items with cellophane holes or tears large enough to allow the item to be removed.",
        bgColor: "bg-[#8DE1F3]"
    },
    {
        title: "Authenticated Media",
        subTitle: "The item will be authenticated by AMG as legitimate as with graded items, but instead of a grade on the label inside the case, the letter “A” for “Archived” will appear.",
        description: "",
        bgColor: "bg-[#FFB1F3]"
    },
    {
        title: "Custom Requests",
        subTitle: "Any audio media product that is displayed in a custom configuration as designed by the AMG team and  customer.",
        description: "",
        bgColor: "bg-[#252422]"
    }
]
