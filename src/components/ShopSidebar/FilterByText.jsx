/* eslint-disable react-hooks/exhaustive-deps */
"use client";


import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilterByText = ({ dictionary, lang }) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);


    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        if (params.get('searchKeyWord')) {
            setSearchText(params.get('searchKeyWord'));
        }
    }, []);


    const handleSearch = () => {
        if (searchText) {
            params.set('searchKeyWord', searchText);

        } else {
            params.delete('searchKeyWord');
        }

        replace(`/${lang}/shop/?${params.toString()}`);
    };


    return (
        <>

            <div className="w-full max-w-xl relative flex">
                <div className="absolute left-4 top-4 text-lg text-gray-400 hidden md:flex">
                    <FontAwesomeIcon
                        icon={faSearch}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </div>

                <input
                    type="text"
                    name="search"
                    id="search"
                    className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
                    placeholder={dictionary?.type_here}
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e?.target?.value);
                    }}
                />

                <button
                    className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent  hover:text-primary transition hidden md:flex md:items-center"
                    onClick={() => handleSearch()}
                >
                    {dictionary?.search}
                </button>

            </div>

        </>
    )
}

export default FilterByText
