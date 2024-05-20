import React from 'react'
import SingleProductCard from '../Common/SingleProductCard';
import { getAllTrendingWithAverageRatingAndReviewCount } from '@/database/queries';



const Product = async ({ lang, dictionary }) => {

    const newArrivalItems = await getAllTrendingWithAverageRatingAndReviewCount();


    return (
        <>
            {/* product */}
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.trendingProducts}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {newArrivalItems?.map((eachNewItem) => (
                        <SingleProductCard
                            key={eachNewItem?.id}
                            eachNewItem={eachNewItem}
                            dictionary={dictionary}
                            lang={lang}
                        />
                    ))
                    }


                </div>
            </div>
            {/* product */}
        </>
    )
}

export default Product
