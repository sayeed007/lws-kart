'use client'

import FilterByCategory from './FilterByCategory';
import FilterByColor from './FilterByColor';
import FilterByPrice from './FilterByPrice';
import FilterBySize from './FilterBySize';

const ShopSidebar = ({ dictionary, allCategory, allSizes, allColors, filterObject }) => {


    return (
        <>
            {/* sidebar  */}

            <div className="divide-y divide-gray-200 space-y-5">

                {/* FILTER BY CATEGORY */}

                <FilterByCategory
                    dictionary={dictionary}
                    filterObject={filterObject}
                    allCategory={allCategory}

                />



                {/* FILTER BY PRICE */}
                <FilterByPrice
                    dictionary={dictionary}
                    filterObject={filterObject}
                />

                {/* FILTER BY SIZE */}
                <FilterBySize
                    dictionary={dictionary}
                    filterObject={filterObject}
                    allSizes={allSizes}
                />


                {/* FILTER BY COLOR */}
                <FilterByColor
                    dictionary={dictionary}
                    filterObject={filterObject}
                    allColors={allColors}
                />


            </div>
        </>
    )
}

export default ShopSidebar
