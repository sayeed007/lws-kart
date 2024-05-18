import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Category1 from '../../../public/assets/images/category/category-1.jpg';
import Category2 from '../../../public/assets/images/category/category-2.jpg';
import Category3 from '../../../public/assets/images/category/category-3.jpg';
import Category4 from '../../../public/assets/images/category/category-4.jpg';
import Category5 from '../../../public/assets/images/category/category-5.jpg';
import Category6 from '../../../public/assets/images/category/category-6.jpg';


const category = [
    {
        name: 'Bedroom',
        image: Category1
    },
    {
        name: 'Living Room',
        image: Category2
    },
    {
        name: 'Kitchen',
        image: Category3
    },
    {
        name: 'Office',
        image: Category4
    },
    {
        name: 'Outdoor',
        image: Category5
    },
    {
        name: 'Mattress',
        image: Category6
    },
];


const Categories = ({ dictionary }) => {
    return (
        <>
            {/* categories */}
            <div className="container py-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.shopByCategory}
                </h2>

                <div className="grid grid-cols-3 gap-3">

                    {category?.map((eachCategory, categoryIndex) => {
                        return (
                            <div
                                className="relative rounded-sm overflow-hidden group"
                                key={eachCategory?.name}
                            >
                                <Image
                                    src={eachCategory?.image}
                                    alt="category 1"
                                    className="w-full"
                                    width={1000}
                                    height={1000}
                                />
                                <Link
                                    href="#"
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                                    {dictionary?.[eachCategory?.name]}
                                </Link>
                            </div>
                        )
                    })
                    }

                </div>
            </div>
            {/* ./categories */}
        </>
    )
}

export default Categories
