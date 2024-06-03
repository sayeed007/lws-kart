"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const FilterByCategory = ({ dictionary, filterObject, allCategory }) => {


    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const category = filterObject?.category?.length > 0 ? filterObject?.category?.split('|') : [];

    const handleCategoryChange = (checked, value) => {


        if (checked) {
            let currentCategory = [...category]; // Create a copy of the category array
            currentCategory.push(value);

            const queryString = currentCategory.join('|');

            params.set('category', queryString);

        } else {
            let currentCategory = [...category]; // Create a copy of the category array
            currentCategory = currentCategory.filter(cat => cat !== value); // Update currentCategory with filtered result

            if (currentCategory.length > 0) {
                const queryString = currentCategory.join('|');

                params.set('category', queryString);
            } else {
                params.delete('category');
            }
        }

        toast.info('Getting filtered data', { autoClose: 500 });
        replace(`${pathname}?${params.toString()}`);
    };


    return (
        <>
            <div>

                <h3 className="text-xl text-gray-800 mb-3  font-medium">
                    {dictionary?.categories}
                </h3>

                <div className="space-y-2">

                    {allCategory?.map((eachCategory) => {

                        return (
                            <div
                                className="flex items-center"
                                key={eachCategory?.name}
                            >
                                <input
                                    type="checkbox"
                                    name="category-checkbox"
                                    id={eachCategory?.name}
                                    className="text-primary focus:ring-0 rounded-sm cursor-pointer"
                                    checked={category?.includes(eachCategory?.name)}
                                    onChange={(e) => handleCategoryChange(e?.target?.checked, eachCategory?.name)}
                                />
                                <label
                                    htmlFor={eachCategory?.name}
                                    className="text-gray-600 ml-3 cursor-pointer">
                                    {eachCategory?.name}
                                </label>
                                <div className="ml-auto text-gray-600 text-sm">
                                    {eachCategory?.totalProductCount}
                                </div>
                            </div>
                        )
                    })

                    }

                </div>
            </div>
        </>
    )
}

export default FilterByCategory
