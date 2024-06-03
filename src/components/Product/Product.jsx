import React from 'react'
import SingleProductCard from '../Common/SingleProductCard';
import { getAllTrendingWithAverageRatingAndReviewCount } from '@/database/queries';
import ItemNotFound from '../../../public/assets/icons/ItemNotFound.svg'



const Product = async ({ lang, dictionary }) => {

    const trendingItems = await getAllTrendingWithAverageRatingAndReviewCount();


    return (
        <>
            {/* product */}
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.trendingProducts}
                </h2>

                {trendingItems?.length > 0 ?
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {trendingItems?.map((eachNewItem) => (
                            <SingleProductCard
                                key={eachNewItem?.id}
                                eachNewItem={eachNewItem}
                                dictionary={dictionary}
                                lang={lang}
                            />
                        ))
                        }
                    </div>
                    :
                    <div className='flex flex-col w-full justify-center items-center'>
                        <ItemNotFound
                            alt="No Trending Product"
                            width={600}
                            height={300}
                        />
                        <div className='font-bold'>
                            {dictionary?.noTrendingProduct}
                        </div>
                    </div>
                }

            </div>
            {/* product */}
        </>
    )
}

export default Product
