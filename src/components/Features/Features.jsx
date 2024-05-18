import Image from 'next/image'
import React from 'react'

const Features = ({ dictionary }) => {


    return (
        <>
            {/* features */}
            <div className="container py-16">
                <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">

                    {/* Free Shipping */}
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <Image
                            src="assets/images/icons/delivery-van.svg"
                            alt="Delivery"
                            className="w-12 h-12 object-contain"
                            width={48}
                            height={48}
                        />
                        <div>
                            <h4 className="font-medium capitalize text-lg">
                                {dictionary?.freeShopping}
                            </h4>
                            <p className="text-gray-500 text-sm">
                                {dictionary?.orderOver}
                            </p>
                        </div>
                    </div>

                    {/* Money Returns */}
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <Image
                            src="assets/images/icons/money-back.svg"
                            alt="Delivery"
                            className="w-12 h-12 object-contain"
                            width={48}
                            height={48}
                        />
                        <div>
                            <h4 className="font-medium capitalize text-lg">
                                {dictionary?.moneyReturns}
                            </h4>
                            <p className="text-gray-500 text-sm">
                                {dictionary?.moneyReturnDays}
                            </p>
                        </div>
                    </div>

                    {/* Customer support */}
                    <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
                        <Image
                            src="assets/images/icons/service-hours.svg"
                            alt="Delivery"
                            className="w-12 h-12 object-contain"
                            width={48}
                            height={48}
                        />
                        <div>
                            <h4 className="font-medium capitalize text-lg">
                                {dictionary?.support}
                            </h4>
                            <p className="text-gray-500 text-sm">
                                {dictionary?.customerSupport}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* features */}
        </>
    )
}

export default Features
