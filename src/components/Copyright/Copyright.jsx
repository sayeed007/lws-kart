import Image from 'next/image'
import React from 'react'
import Methods from '../../../public/assets/images/methods.png'

const Copyright = ({ dictionary }) => {
    return (
        <>
            {/* copyright */}
            <div className="bg-gray-800 py-4">
                <div className="container flex items-center justify-between">
                    <p className="text-white">
                        &copy; TailCommerce - {dictionary?.copyright}
                    </p>
                    <div>
                        <Image
                            src={Methods}
                            alt="methods"
                            className="h-5"
                            width={250}
                            height={50}
                        />
                    </div>
                </div>
            </div>
            {/* copyright */}
        </>
    )
}

export default Copyright
