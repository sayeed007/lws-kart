import Image from 'next/image';
import Link from 'next/link';

import { getAllCategories } from '@/database/queries';



const Categories = async ({ lang, dictionary }) => {

    const allCategory = await getAllCategories();

    return (
        <>
            {/* categories */}
            <div className="container py-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.shopByCategory}
                </h2>

                <div className="grid grid-cols-3 gap-3">

                    {allCategory?.map((eachCategory, categoryIndex) => {
                        return (
                            <div
                                className="relative rounded-sm overflow-hidden group"
                                key={eachCategory?.id}
                            >
                                <Image
                                    src={eachCategory?.image}
                                    alt="category 1"
                                    className="w-full"
                                    width={1000}
                                    height={1000}
                                />
                                <Link
                                    href={`/${lang}/shop?category=${eachCategory?.name}`}
                                    className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                                    {eachCategory?.name}
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
