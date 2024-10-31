import Image from "next/image"
export const merchData = [
    {
        product_name: "AMG Long Sleeve Tee, Black",
        price: "$25.00",
        image: () => <Image width={620} height={620} alt={"merch-1"} src={"/images/merch-3.png"}/>
    },
    {
        product_name: "AMG Flat Brim Hat, Black",
        price: "$25.00",
        image: () => <Image width={620} height={620} alt={"merch-2"} src={"/images/merch-1.png"}/>
    },
    {
        product_name: "AMG Knit Beanie, White",
        price: "$25.00",
        image: () => <Image width={620} height={620} alt={"merch-3"} src={"/images/merch-2.png"}/>
    },
    {
        product_name: "AMG Knit Beanie, Black",
        price: "$25.00",
        image: () => <Image width={580} height={580} alt={"merch-4"} src={"/images/merch-4.png"}/>
    }
]
