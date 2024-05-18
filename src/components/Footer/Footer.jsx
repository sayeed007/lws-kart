import React from 'react'
import LWSLogo from '../../../public/assets/images/logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaFacebookSquare, FaGithubSquare, FaInstagramSquare, FaTwitterSquare } from 'react-icons/fa';
import Link from 'next/link';


const footerCategory = {
    Solutions: [
        {
            name: 'Marketing',
            url: '#'
        },
        {
            name: 'Analytics',
            url: '#'

        },
        {
            name: 'Commerce',
            url: '#'

        },
        {
            name: 'Insights',
            url: '#'

        }
    ],
    Support: [
        {
            name: 'Pricing',
            url: '#'
        },
        {
            name: 'Guides',
            url: '#'

        },
        {
            name: 'API Status',
            url: '#'

        }
    ],
}



const Footer = ({ dictionary }) => {
    return (
        <>
            {/* footer */}
            <footer className="bg-white pt-16 pb-12 border-t border-gray-100">
                <div className="container grid grid-cols-1 ">
                    <div className="col-span-1 space-y-4">

                        <LWSLogo
                            alt="Logo"
                            width={518}
                            height={168}
                        />
                        <div className="mr-2">
                            <p className="text-gray-500">
                                {dictionary?.heroTitle}
                            </p>
                        </div>

                        <div className="flex space-x-5">

                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500">
                                <FaFacebookSquare
                                    style={{ color: '#FD3D57', fontSize: '48px' }}
                                />
                            </Link>

                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500">
                                <FaInstagramSquare
                                    style={{ color: '#FD3D57', fontSize: '48px' }}
                                />
                            </Link>

                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500">
                                <FaTwitterSquare
                                    style={{ color: '#FD3D57', fontSize: '48px' }}
                                />
                            </Link>

                            <Link
                                href="#"
                                className="text-gray-400 hover:text-gray-500">
                                <FaGithubSquare
                                    style={{ color: '#FD3D57', fontSize: '48px' }}
                                />
                            </Link>

                        </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4 mt-2">

                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            {Object.entries(footerCategory)?.map(([key, value], index) => {
                                return (
                                    <div key={`${key}-${index}`}>

                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                            {dictionary?.[key]}
                                        </h3>

                                        <div className="mt-4 space-y-4">
                                            {value?.map((eachType, typeIndex) => {
                                                return (
                                                    <Link
                                                        key={`${eachType?.name}-${typeIndex}`}
                                                        href={eachType?.url}
                                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                                    >
                                                        {dictionary?.[eachType?.name]}
                                                    </Link>
                                                )
                                            })
                                            }
                                        </div>

                                    </div>
                                )
                            })
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                            {Object.entries(footerCategory)?.map(([key, value], index) => {
                                return (
                                    <div key={`${key}-${index}`}>

                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                                            {dictionary?.[key]}
                                        </h3>

                                        <div className="mt-4 space-y-4">
                                            {value?.map((eachType, typeIndex) => {
                                                return (
                                                    <Link
                                                        key={`${eachType?.name}-${typeIndex}`}
                                                        href={eachType?.url}
                                                        className="text-base text-gray-500 hover:text-gray-900 block"
                                                    >
                                                        {dictionary?.[eachType?.name]}
                                                    </Link>
                                                )
                                            })
                                            }
                                        </div>

                                    </div>
                                )
                            })
                            }
                        </div>

                    </div>
                </div>
            </footer>
            {/* ./footer */}
        </>
    )
}

export default Footer
