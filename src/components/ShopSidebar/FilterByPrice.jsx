import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const FilterByPrice = ({ dictionary, filterObject }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);


    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);


    useEffect(() => {

        if (filterObject?.minPrice) {
            setMinPrice(filterObject?.minPrice);
        }

        if (filterObject?.maxPrice) {
            setMaxPrice(filterObject?.maxPrice);
        }

    }, [filterObject]);

    // Function to debounce input changes
    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    // Function to handle input change for input 1 with debouncing
    const handleMinPriceChange = debounce((value) => {
        // Perform any action with minPrice

        if (value > 0) {
            params.set('minPrice', value);
        } else {
            params.delete('minPrice');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 2000); // 2000 milliseconds debounce delay

    // Function to handle input change for input 2 with debouncing
    const handleMaxPriceChange = debounce((value) => {
        // Perform any action with maxPrice

        if (value > 0) {
            params.set('maxPrice', value);
        } else {
            params.delete('maxPrice');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 2000); // 2000 milliseconds debounce delay

    return (
        <>

            <div className="pt-4">

                <h3 className="text-xl text-gray-800 mb-3  font-medium">
                    {dictionary?.price}
                </h3>

                <div className="mt-4 flex items-center">
                    <input
                        type="number"
                        name="min"
                        id="min"
                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                        placeholder="min"
                        value={minPrice}
                        onChange={(e) => {
                            setMinPrice(e.target.value);
                            handleMinPriceChange(e.target.value);
                        }}
                    />
                    <span className="mx-3 text-gray-500">-</span>
                    <input
                        type="number"
                        name="max"
                        id="max"
                        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                        placeholder="max"
                        value={maxPrice}
                        onChange={(e) => {
                            setMaxPrice(e.target.value);
                            handleMaxPriceChange(e.target.value);
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default FilterByPrice;
