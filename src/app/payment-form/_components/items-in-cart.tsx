import { CartMineTotal } from '@/types';

interface ItemsInCartProps {
    cartMineTotal: CartMineTotal;
}


const ItemsInCart = ({ cartMineTotal }: ItemsInCartProps) => {
    return (
        <ul>
            {
                cartMineTotal?.items?.filter((item) => item?.name !== "SHIPPING AMOUNT" && item?.name !== "RETURN INSURANCE AMOUNT")?.map((item) => <li key={item?.id} className='flex items-center my-0.5 justify-between gap-6'>
                    <h3 className='text-sm font-normal '>{item?.name} {item?.qty > 1 ? `* ${item?.qty}` : null}</h3>
                    <p className='text-sm font-normal '>${item?.price}</p>
                </li>)
            }
        </ul>
    )
}

export default ItemsInCart