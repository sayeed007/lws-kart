import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ShopSidebar from './ShopSidebar'

const FloatingSidebar = ({ dictionary }) => {
    return (
        <>
            {/* drawer init and toggle */}
            <div className="text-center md:hidden">
                <button
                    className="text-white hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 block md:hidden"
                    type="button"
                    data-drawer-target="drawer-example"
                    data-drawer-show="drawer-example"
                    aria-controls="drawer-example"
                >
                    <FontAwesomeIcon
                        icon={faTh}
                        width={16}
                        height={16}
                        color={'#FD3D57'}
                    />
                </button>
            </div>

            {/* drawer component */}
            <div id="drawer-example"
                className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
                tabindex="-1"
                aria-labelledby="drawer-label"
            >
                <h5
                    id="drawer-label"
                    className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
                    <svg
                        className="w-5 h-5 mr-2"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clip-rule="evenodd">
                        </path>
                    </svg>
                    Info
                </h5>

                <button
                    type="button"
                    data-drawer-hide="drawer-example"
                    aria-controls="drawer-example"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">
                        Close menu
                    </span>
                </button>

                {/* Drawer Content */}
                <ShopSidebar
                    dictionary={dictionary}
                />

            </div>
        </>
    )
}

export default FloatingSidebar
