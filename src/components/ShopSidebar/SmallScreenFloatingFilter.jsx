'use client'


import { faArrowRight, faClose, faInfoCircle, faTh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ShopSidebar from './ShopSidebar';

const SmallScreenFloatingFilter = ({ dictionary }) => {
    const [isOpen, setIsOpen] = useState(false);
    const drawerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Add event listener to detect clicks outside the drawer
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Remove event listener when component is unmounted
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Drawer init and toggle */}
            <div className="text-center md:hidden">
                <button
                    className="text-white hover:bg-orange-100 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-100 block md:hidden"
                    type="button"
                    onClick={toggleDrawer}
                >
                    <FontAwesomeIcon
                        icon={faTh}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </button>
            </div>

            {/* Drawer component */}
            <div
                ref={drawerRef}
                className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${isOpen ? '' : '-translate-x-full'
                    } bg-white w-80 dark:bg-gray-800`}
                tabIndex="-1"
                aria-labelledby="drawer-label"
            >
                {/* Drawer Header */}
                <div className="flex justify-between mb-4">
                    <h5
                        id="drawer-label"
                        className="inline-flex items-center text-base font-semibold text-gray-500 dark:text-gray-400"
                    >
                        <FontAwesomeIcon
                            icon={faInfoCircle}
                            width={20}
                            height={20}
                            color={'#6B7280'}
                        />
                        <span className='mx-2'>
                            {dictionary?.info}
                        </span>
                    </h5>
                    <button
                        type="button"
                        onClick={toggleDrawer}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                    >

                        <FontAwesomeIcon
                            icon={faClose}
                            width={20}
                            height={20}
                            color={'#6B7280'}
                        />
                        <span className="sr-only">
                            {dictionary?.closeMenu}
                        </span>
                    </button>
                </div>

                {/* Drawer Content */}
                <ShopSidebar
                    dictionary={dictionary}
                />

                <div className="grid grid-cols-2 gap-4 my-4">
                    <Link
                        href="#"
                        className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        {dictionary?.learnMore}
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        {dictionary?.getAccess}
                        <FontAwesomeIcon
                            icon={faArrowRight}
                            width={24}
                            height={24}
                            color={'#FFFFFF'}
                        />
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SmallScreenFloatingFilter;
