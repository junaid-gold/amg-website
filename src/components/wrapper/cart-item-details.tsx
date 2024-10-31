import { useQuery } from '@tanstack/react-query';
import { getCartItemDetails } from './actions';
import { ProductItem } from '@/types';
import BlackAnimation from '../black-animation';

interface CartItemDetailsProps {
    sku: string

    product_option?: {
        extension_attributes: { custom_options: [{ option_id: string, option_value: string }] }
    }
}

const CartItemDetails = ({ sku, product_option }: CartItemDetailsProps) => {
    const { data, isPending } = useQuery<ProductItem>({
        queryKey: ["customerCart", sku],
        queryFn: () => getCartItemDetails(sku),
        refetchOnWindowFocus: true,
    });


    if (isPending) {
        return <div className='flex items-center justify-center'>
            <BlackAnimation />
        </div>
    }
    const { options } = data!

    const product_options = product_option?.extension_attributes?.custom_options

    // Function to merge product_option values into options
    const mergedOptions = options.map((option) => {
        // Find the matching product_option entry by option_id
        const productOption = product_options?.find(
            (po) => parseInt(po.option_id) === option.option_id
        );

        // If a matching product_option is found, add its value to the option object
        if (productOption) {
            return {
                ...option,
                option_value: productOption.option_value,
            };
        }

        // If no match is found, return the option object as is
        return option;
    });

    return (
        // @ts-ignore
        <div className=''>{mergedOptions?.filter((option) => option?.title !== "Album Name")?.filter((option) => option?.title !== "Artist")?.filter((option) => option?.option_value)?.map((mergedOption) =>
            <div className='' key={mergedOption?.option_id}>
                <h1 className='font-semibold inline-block w-fit'>{mergedOption?.title}:</h1>
                {
                    // @ts-ignore
                    mergedOption?.type === "area" || mergedOption?.type === "field" ? <span>{mergedOption?.option_value}</span> :
                        <span className='w-fit inline-block ml-2'>
                            {/* @ts-ignore */}
                            {mergedOption?.values?.find((value) => value?.option_type_id === Number(mergedOption?.option_value))?.title}
                        </span>

                }
            </div>
        )}</div>
    )
}

export default CartItemDetails