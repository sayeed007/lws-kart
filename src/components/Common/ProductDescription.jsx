import Image from 'next/image'
import React from 'react'
import StarRating from '../Rating/StarRating'
import Link from 'next/link'
import ShareComponent from './ShareComponent'

const ProductDescription = ({ dictionary, productInfo }) => {
    return (
        <>


            {/* description */}
            <div className="container mt-4 pb-16">

                <h3 className="text-2xl border-b border-gray-200 font-roboto text-gray-800 pb-2 font-medium">
                    {dictionary?.productDetails}
                </h3>
                <div className="w-3/5 pt-6">
                    <div className="text-gray-600">
                        <p>
                            {productInfo?.details}
                        </p>
                    </div>

                </div>
            </div>
            {/* description */}



        </>
    )
}

export default ProductDescription
