import { usePathname, useRouter, useSearchParams } from 'next/navigation';


const FilterByColor = ({ dictionary, filterObject, allColors }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const paramColorValue = filterObject?.color ? filterObject?.color : '';

    const handleColorChange = (checked, value) => {
        if (checked) {

            const queryString = value;

            params.set('color', queryString);

        } else {
            params.delete('color');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <>
            <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3  font-medium">
                    {dictionary?.color}
                </h3>
                <div className="flex items-center gap-2">

                    {allColors?.map((color) => {
                        return (
                            <div
                                className="color-selector"
                                key={color?.name}
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    id={color?.name}
                                    className="hidden"
                                    checked={paramColorValue === color?.name}
                                    onChange={(e) => handleColorChange(e?.target?.checked, color?.name)}
                                />
                                <label htmlFor={color?.name}
                                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                                    style={{ background: color?.hex }}
                                >
                                    {/* {color?.visibleName} */}
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

export default FilterByColor;
