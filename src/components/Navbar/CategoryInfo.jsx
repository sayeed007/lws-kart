import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import Link from 'next/link';


const category = [
    {
        name: 'Sofa',
        image: 'assets/images/icons/sofa.svg'
    },
    {
        name: 'Living Room',
        image: 'assets/images/icons/terrace.svg'
    },
    {
        name: 'Bedroom',
        image: 'assets/images/icons/bed.svg'
    },
    {
        name: 'Office',
        image: 'assets/images/icons/office.svg'
    },
    {
        name: 'Outdoor',
        image: 'assets/images/icons/outdoor-cafe.svg'
    },
    {
        name: 'Mattress',
        image: 'assets/images/icons/bed-2.svg'
    },
];



const CategoryInfo = ({ dictionary }) => {



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

                    {category?.map((eachCategory, categoryIndex) => {
                        return (
                            <Link
                                key={eachCategory?.name}
                                href="#"
                                className="flex items-center px-6 py-3 hover:bg-gray-100 transition">
                                <Image
                                    src={eachCategory?.image}
                                    alt="sofa"
                                    className="w-5 h-5 object-contain"
                                    width={20}
                                    height={20}
                                />
                                <span className="ml-6 text-gray-600 text-sm">
                                    {dictionary?.[eachCategory?.name]}
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
