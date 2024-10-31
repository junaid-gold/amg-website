import useCartItem from '@/hooks/use-cart-item';
import { Value } from '@/types'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
// import Slider from 'react-rangeslider'

import StepRangeSlider from "react-step-range-slider";
import "react-range-slider-input/dist/style.css";

// import "react-rangeslider/lib/index.css";
// import Slider from 'react-rangeslider';

interface SliderInputProps {
    values: Value[];
    option_id: number
}

const extractValuesFromTitle = (
    options: {
        title: string;
        sort_order: number;
        price: number;
        price_type: string;
        option_type_id: number;
    }[]
) => {
    return options?.map((option) => {
        const match = option.title.match(/\$([\d,\.]+)\s*-\s*\$([\d,\.]+)?/);
        const lowerMatch = option.title.match(/\$([\d,\.]+)\s*and Up/);

        const lowerBound = match
            ? parseFloat(match[1].replace(/,/g, ""))
            : lowerMatch
                ? parseFloat(lowerMatch[1].replace(/,/g, ""))
                : null;

        const upperBound = match && match[2] ? parseFloat(match[2].replace(/,/g, "")) : null;

        return {
            lowerBound,
            option_type_id: option?.option_type_id,
            price: option?.price,
            upperBound,
        };
    });
};
const SliderInput = ({ values, option_id }: SliderInputProps) => {
    const valueSets: {
        lowerBound: number | null;
        option_type_id: number;
        price: number;
        upperBound: number | null;
    }[] = extractValuesFromTitle(values);

    const { updateCustomOption, setValueRange } = useCartItem();
    const pathname = usePathname();
    const { cartItem } = useCartItem();
    const [inputLabel, setInputLabel] = useState("")
    const filteredCustomOption =
        cartItem?.product_option?.extension_attributes?.custom_options?.find(
            (custom_option) => custom_option?.option_id === option_id
        );

    const selectedOne = values?.find(
        (value) => value?.option_type_id === Number(filteredCustomOption?.option_value)
    );

    const [value, setValue] = useState<number>(selectedOne?.price || 0); // Initialize with selected value if it exists
    const [labelValue, setLabelValue] = useState<number | undefined>(
        selectedOne?.price || undefined
    );

    const handleChangeStart = () => { };

    const handleChange = (value: number) => {
        setValue(value);
    };

    const handleChangeComplete = (value: number) => {
        const valueInRangeSet = valueSets?.find(
            (set) =>
                value >= set?.lowerBound! &&
                (set.upperBound === null || value <= set.upperBound)
        );


        if (valueInRangeSet) {
            updateCustomOption(
                option_id,
                valueInRangeSet.option_type_id,
                valueInRangeSet?.price,
            );
            setValueRange(valueInRangeSet?.lowerBound, valueInRangeSet?.upperBound, cartItem?.valueRange?.valueToCheck);
        }
    };

    useEffect(() => {
        if (selectedOne) {
            const extractedValueSet = extractValuesFromTitle([selectedOne])
            if (extractedValueSet?.length > 0) {
                if (extractedValueSet?.[0]?.lowerBound && extractedValueSet?.[0]?.upperBound) {
                    setValueRange(extractedValueSet?.[0]?.lowerBound, extractedValueSet?.[0]?.upperBound, cartItem?.valueRange?.valueToCheck)
                }
            }
            setInputLabel(`$${extractedValueSet?.[0]?.lowerBound?.toLocaleString("en-US")} - ${extractedValueSet?.[0]?.upperBound === null ? "Infinity" : `$${extractedValueSet?.[0]?.upperBound?.toLocaleString("en-US")}`}`)
            setValue(extractedValueSet?.[0]?.lowerBound || 0); // Set value from the selected option
            setLabelValue(selectedOne.price); // Set labelValue from the selected option
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Ensure this runs when selectedOne changes

    useEffect(() => {
        const valueInRangeSet = valueSets?.find(
            (set) =>
                value >= set?.lowerBound! &&
                (set.upperBound === null || value <= set.upperBound)
        );

        setInputLabel(`$${valueInRangeSet?.lowerBound?.toLocaleString("en-US")} - ${valueInRangeSet?.upperBound === null ? "Infinity" : `$${valueInRangeSet?.upperBound?.toLocaleString("en-US")}`}`)
        if (valueInRangeSet) {
            setLabelValue(valueInRangeSet.price);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, valueSets]);

    useEffect(() => {

        let valueToTest = 0
        const filteredOption = cartItem?.product_option?.extension_attributes?.custom_options?.find((customOption) => customOption?.option_id?.toString() === option_id?.toString())
        if (filteredOption) {
            valueToTest = valueSets?.find((valueSet) => valueSet?.option_type_id?.toString() === filteredOption?.option_value)?.lowerBound || 0
        }
        const valueInRangeSet = valueSets?.find(
            (set) =>
                valueToTest >= set?.lowerBound! &&
                (set.upperBound === null || valueToTest <= set.upperBound)
        );

        if (valueInRangeSet) {
            setValue(valueInRangeSet?.lowerBound || 0)
            updateCustomOption(option_id, valueInRangeSet.option_type_id, valueInRangeSet.price);

            setValueRange(
                valueInRangeSet?.lowerBound,
                valueInRangeSet?.upperBound,
                cartItem?.valueRange?.valueToCheck || 0
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const allPossibleValues = valueSets?.map((sets) => ([sets?.lowerBound, sets?.upperBound]))?.reduce((acc, set) => acc.concat(set), [])
    const minValue = allPossibleValues
        ? Math.min(
            ...allPossibleValues?.filter((value) => value !== null && value !== undefined)
        )
        : 0;
    const maxValue = allPossibleValues ? Math.max(...allPossibleValues?.filter((value) => value !== null && value !== undefined)) : Infinity;
    const range = [
        {
            value: 0,
            step: 500,
        },
        {
            value: 500,
            step: 1000
        },
        {
            value: 1500,
            step: 3500,
        },
        {
            value: 5000,
            step: 5000,
        },
        {
            value: 10000,
            step: 15000,
        },
        {
            value: 25000,
            step: 25000,
        },
        {
            value: 50000,
            step: 50000,
        },
        {
            value: 100000,
        }
    ];
    return (
        <>
            <div className={`flex items-center justify-center h-36 w-full bg-theme-gray rounded-2xl relative ${pathname?.includes("/single-page-form") ? "" : "md:w-[450px]"}`}>
                {/* <p className={"font-theme-font-medium text-[40px]"}>$</p> */}
                <p className={"font-theme-font-medium text-3xl"}>{inputLabel}</p>
                {value !== 0 && (
                    <div className={"bg-[#8DE1F3] px-2 py-1 absolute -top-4 right-0 rounded-full text-xs"}>
                        +${labelValue?.toFixed(2)}
                    </div>
                )}
            </div>
            <div className={`w-full flex justify-center items-center gap-4 mt-10 ${pathname?.includes("/media-submission") ? "md:w-fit" : ""}`}>
                <p className={`font-theme-font-light ${pathname?.includes("/media-submission") ? "md:ml-10" : ""}`}>{minValue?.toLocaleString("en-US")}</p>
                <div className={`w-full ${pathname?.includes("/media-submission") ? "md:w-[450px]" : ""}`}>
                    {/* <Slider
                        min={minValue || 0}
                        max={maxValue}
                        value={value}
                        onChangeStart={handleChangeStart}
                        onChange={handleChange}
                        onChangeComplete={handleChangeComplete}
                    /> */}

                    {/* @ts-ignore */}
                    <StepRangeSlider
                        min={minValue || 0}
                        max={maxValue}
                        value={value}
                        range={range}
                        onChange={(value: number) => {
                            setValue(value)
                            handleChangeComplete(value)
                        }}
                    />
                </div>
                <p className={"font-theme-font-light"}>${maxValue?.toLocaleString("en-US")}+</p>
            </div>
        </>
    );
};

export default SliderInput;
