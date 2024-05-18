import Image from 'next/image'
import React from 'react'
import StarRating from '../Rating/StarRating'
import Link from 'next/link'
import ShareComponent from './ShareComponent'

const ProductDetails = ({ dictionary }) => {
    return (
        <>


            {/* product-detail */}
            <div className="container grid grid-cols-2 gap-6">
                <div>

                    <Image
                        src="/assets/images/products/product1.jpg"
                        alt="product"
                        className="w-full"
                        width={1000}
                        height={1000}
                    />

                    <div className="grid grid-cols-5 gap-4 mt-4">

                        <Image
                            src="/assets/images/products/product2.jpg"
                            alt="product2"
                            className="w-full cursor-pointer border border-primary"
                            width={1000}
                            height={1000}
                        />

                        <Image
                            src="/assets/images/products/product3.jpg"
                            alt="product2"
                            className="w-full cursor-pointer border"
                            width={1000}
                            height={1000}
                        />

                        <Image
                            src="/assets/images/products/product4.jpg"
                            alt="product2"
                            className="w-full cursor-pointer border"
                            width={1000}
                            height={1000}
                        />

                        <Image
                            src="/assets/images/products/product5.jpg"
                            alt="product2"
                            className="w-full cursor-pointer border"
                            width={1000}
                            height={1000}
                        />

                        <Image
                            src="/assets/images/products/product6.jpg"
                            alt="product2"
                            className="w-full cursor-pointer border"
                            width={1000}
                            height={1000}
                        />

                    </div>
                </div>

                <div>

                    <h2 className="text-3xl font-medium uppercase mb-2">
                        Italian L Shape Sofa
                    </h2>

                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <StarRating
                                originalRating={4}
                                ratingRange={5}
                            />
                        </div>
                        <div className="text-xs text-gray-500 ml-3">
                            (150 {dictionary?.reviews})
                        </div>
                    </div>

                    <div className="space-y-2">

                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>
                                {dictionary?.availability}:
                            </span>
                            <span className="text-green-600">
                                In Stock
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.brand}:
                            </span>
                            <span className="text-gray-600">
                                Apex
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.category}:
                            </span>
                            <span className="text-gray-600">
                                Sofa
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.sku}:
                            </span>
                            <span className="text-gray-600">
                                BE45VGRT
                            </span>
                        </p>

                    </div>

                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">
                            $45.00
                        </p>
                        <p className="text-base text-gray-400 line-through">
                            $55.00
                        </p>
                    </div>

                    <p className="mt-4 text-gray-600">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum
                        reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit
                        consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro.
                    </p>

                    <div className="mt-4">
                        <h3 className="text-gray-800 font-semibold uppercase mb-1">
                            {dictionary?.quantity}
                        </h3>
                        <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                                -
                            </div>
                            <div className="h-8 w-8 text-base flex items-center justify-center">
                                4
                            </div>
                            <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                                +
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">

                        <Link
                            href="#"
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            <i className="fa-solid fa-bag-shopping"></i>
                            {dictionary?.addToCart}
                        </Link>

                        <Link href="#"
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition">
                            <i className="fa-solid fa-heart"></i>
                            {dictionary?.wishList}
                        </Link>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <ShareComponent
                            recipeInfo={
                                { name: 'ABC' }
                            }
                        />
                    </div>
                </div>
            </div>
            {/* product-detail */}



        </>
    )
}

export default ProductDetails
