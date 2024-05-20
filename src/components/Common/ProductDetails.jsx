import { calculateNewPrice } from '@/utils/data-util'
import Link from 'next/link'
import StarRating from '../Rating/StarRating'
import ImageComponent from './ImageComponent'
import ShareComponent from './ShareComponent'

const ProductDetails = ({ dictionary, productInfo }) => {




    return (
        <>


            {/* product-detail */}
            <div className="container grid grid-cols-2 gap-6">

                <ImageComponent
                    rootProductInfo={JSON.stringify(productInfo)}
                />

                <div>

                    <h2 className="text-3xl font-medium uppercase mb-2">
                        {productInfo?.name}
                    </h2>

                    <h6 className="text-lg font-medium uppercase mb-2">
                        ( {productInfo?.shortName})
                    </h6>

                    <div className="flex items-center mb-4">
                        <div className="flex gap-1 text-sm text-yellow-400">
                            <StarRating
                                originalRating={productInfo?.averageRating}
                                ratingRange={5}
                            />
                        </div>
                        <div className="text-xs text-gray-500 ml-3">
                            ({productInfo?.reviewCount} {dictionary?.reviews})
                        </div>
                    </div>

                    <div className="space-y-2">

                        <p className="text-gray-800 font-semibold space-x-2">
                            <span>
                                {dictionary?.availability}:
                            </span>
                            <span className={`${productInfo?.availableCount > 0 ? "text-green-600" : "text-red-600"}`}>
                                {productInfo?.availableCount > 0 ? "Available" : "Not Available"}
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.brand}:
                            </span>
                            <span className="text-gray-600">
                                {productInfo?.brand}
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.category}:
                            </span>
                            <span className="text-gray-600">
                                {productInfo?.categoryInfo?.name}
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.size}:
                            </span>
                            <span className="text-gray-600">
                                {productInfo?.sizeInfo?.visibleName}
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.color}:
                            </span>

                            <span
                                className="inline-block w-4 h-4 rounded-full"
                                style={{ backgroundColor: productInfo?.colorInfo?.hex }}
                            ></span>


                            <span className="text-gray-600">
                                {productInfo?.colorInfo?.name}
                            </span>
                        </p>

                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">
                                {dictionary?.sku}:
                            </span>
                            <span className="text-gray-600">
                                {productInfo?.productCode}
                            </span>
                        </p>

                    </div>

                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        {productInfo?.discountAvailable ?
                            <>
                                <p className="text-xl text-primary font-semibold">
                                    ${calculateNewPrice(productInfo?.price, productInfo?.discountPercent)}
                                </p>
                                <p className="text-sm text-gray-400 line-through">
                                    ${productInfo?.price}
                                </p>
                            </>
                            :
                            <p className="text-xl text-primary font-semibold">
                                ${productInfo?.price}
                            </p>
                        }
                    </div>

                    <p className="mt-4 text-gray-600">
                        {productInfo?.description}
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
                                { name: productInfo?.name }
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
