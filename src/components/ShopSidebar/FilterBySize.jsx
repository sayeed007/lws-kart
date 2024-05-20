import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const FilterBySize = ({ dictionary, filterObject, allSizes }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const paramSizeValue = filterObject?.size ? filterObject?.size : '';

    const handleSizeChange = (checked, value) => {
        if (checked) {

            const queryString = value;

            params.set('size', queryString);

        } else {
            params.delete('size');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3  font-medium">
                    {dictionary?.size}
                </h3>
                <div className="flex items-center gap-2">

                    {allSizes?.map((size) => {
                        return (
                            <div
                                className="size-selector"
                                key={size?.sizeName}
                            >
                                <input
                                    type="radio"
                                    name="size"
                                    id={size?.sizeName}
                                    className="hidden"
                                    checked={paramSizeValue === size?.visibleName}
                                    onChange={(e) => handleSizeChange(e?.target?.checked, size?.visibleName)}
                                />
                                <label
                                    htmlFor={size?.sizeName}
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600">
                                    {size?.visibleName}
                                </label>
                            </div>
                        )
                    })
                    }

                </div>
            </div>
        </>
    );
};

export default FilterBySize;
