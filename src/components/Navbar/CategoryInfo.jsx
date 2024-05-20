import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from 'next/link';




const CategoryInfo = ({ lang, dictionary, allCategory }) => {



    return (
        <>
            <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
                <span className="text-white">
                    <i className="fa-solid fa-bars"></i>
                    <FontAwesomeIcon
                        icon={faBars}
                        width={24}
                        height={24}
                        color={'black'}
                    />
                </span>
                <span className="capitalize ml-2 text-white hidden">
                    All Categories
                </span>

                {/* dropdown */}
                <div
                    className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[600px]"
                    style={{ width: '300px' }}
                >

                    {allCategory?.map((eachCategory, categoryIndex) => {
                        return (
                            <Link
                                key={eachCategory?.name}
                                href={`/${lang}/shop?category=${eachCategory?.name}`}
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <Image
                                    src={eachCategory?.image}
                                    alt="sofa"
                                    className="w-8 h-8 object-contain"
                                    width={30}
                                    height={30}
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {eachCategory?.name}
                                </span>
                            </Link>
                        )
                    })

                    }

                </div>
            </div>
        </>
    )
}

export default CategoryInfo
