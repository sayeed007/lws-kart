import Link from 'next/link'
import React from 'react'


const HeroBanner = ({ dictionary }) => {
    return (
        <>
            {/* banner */}
            <div
                className="bg-cover bg-no-repeat bg-center py-36"
                style={{ backgroundImage: "url('/assets/images/banner-bg.jpg')" }}
            >
                <div className="container">
                    <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize max-w-[600px]">
                        {dictionary?.heroTitle}
                    </h1>
                    <p className='max-w-[600px]'>
                        {dictionary?.heroDescription}
                    </p>
                    <div className="mt-12">
                        <Link
                            href="#"
                            className="bg-primary border border-primary text-white px-8 py-3 font-medium  rounded-md hover:bg-transparent hover:text-primary">
                            {dictionary?.shopNow}
                        </Link>
                    </div>
                </div>
            </div>
            {/* banner */}
        </>
    )
}

export default HeroBanner
