import { create } from 'zustand';
interface CustomOption {
    option_id: number;
    option_value: number | string;
    price?: number
}

interface ValueRange {
    lowerBound: number | null,
    upperBound: number | null,
    valueToCheck?: number
}

interface CartItem {
    item_id: string | number
    sku: string;
    qty: number;
    price: number;
    quote_id: string;
    product_option: {
        extension_attributes: {
            custom_options: CustomOption[];
        };
    };
    valueRange?: ValueRange
}


interface CartStore {
    cartItem: CartItem | null; // Allow the cartItem to be null initially
    setCartItem: (cartItem: CartItem) => void;
    addSku: (sku: string) => void;
    addPrice: (price: number) => void;
    updateQty: (qty: number) => void;
    updateQuoteId: (quote_id: string) => void;
    updateCustomOption: (optionId: number, optionValue: number | string, price?: number) => void;
    removeCustomOption: (optionId: number) => void;
    setValueRange: (lowerBound: number | null, upperBound: number | null, valueToCheck?: number) => void;
    valueRange?: ValueRange;
    resetCartItem: () => void;
}

const defaultCartItem: CartItem = {
    item_id: "",
    sku: "",
    qty: 1,
    price: 0,
    quote_id: "",
    product_option: {
        extension_attributes: {
            custom_options: []
        }
    },
    valueRange: {
        lowerBound: 0,
        upperBound: 0,
        valueToCheck: 0
    }
};

// Zustand store for cart item management
const useCartItem = create<CartStore>((set) => ({
    cartItem: defaultCartItem,
    setCartItem: (cartItem) => set({ cartItem }),
    addSku: (sku) =>
        set((state) => ({ cartItem: { ...state.cartItem, sku } } as CartStore)),
    addPrice: (price) => {
        return set((state) => ({ cartItem: { ...state.cartItem, price } } as CartStore))
    },
    updateQty: (qty) =>
        set((state) => {
            if (!state.cartItem) return state;
            return { cartItem: { ...state.cartItem, qty } };
        }),
    updateQuoteId: (quote_id) =>
        set((state) => {
            if (!state.cartItem) return state;
            return { cartItem: { ...state.cartItem, quote_id } };
        }),
    updateCustomOption: (optionId, optionValue, price) => {
        return set((state) => {
            if (!state.cartItem) return state;
            const existingOptions =
                state?.cartItem?.product_option?.extension_attributes?.custom_options || [];
            let updatedOptions;
            if (optionValue === "") {
                // Remove the option if optionValue is an empty string
                updatedOptions = existingOptions.filter((option) => option.option_id !== optionId);
            } else {
                // Update existing option or add new one
                updatedOptions = existingOptions.some((option) => option.option_id?.toString() === optionId?.toString())
                    ? existingOptions.map((option) =>
                        (option.option_id)?.toString() === (optionId)?.toString()
                            ? { ...option, option_value: optionValue, price: price !== undefined ? price : -Math.abs(option.price || 0) } // Update the existing option
                            : option
                    )
                    : [...existingOptions, { option_id: optionId, option_value: optionValue, price }]; // Add new option if not found
            }

            return {
                cartItem: {
                    ...state.cartItem,
                    product_option: {
                        ...state.cartItem.product_option,
                        extension_attributes: {
                            ...state.cartItem.product_option.extension_attributes,
                            custom_options: updatedOptions,
                        },
                    },
                },
            };
        });
    },
    removeCustomOption: (optionId) => {
        return set((state) => {
            if (!state.cartItem) return state;
            const existingOptions =
                state?.cartItem?.product_option?.extension_attributes?.custom_options || [];
            let updatedOptions;
            updatedOptions = existingOptions.filter((option) => option.option_id?.toString() !== optionId?.toString());
            return {
                cartItem: {
                    ...state.cartItem,
                    product_option: {
                        ...state.cartItem.product_option,
                        extension_attributes: {
                            ...state.cartItem.product_option.extension_attributes,
                            custom_options: updatedOptions,
                        },
                    },
                },
            };
        });
    },
    setValueRange: (lowerBound, upperBound, valueToCheck) => {
        return set((state) => ({ cartItem: { ...state.cartItem, valueRange: { lowerBound, upperBound, valueToCheck } } } as CartStore))
    },
    resetCartItem: () =>
        set(() => ({
            cartItem: defaultCartItem
        }))
}));



export default useCartItem;
