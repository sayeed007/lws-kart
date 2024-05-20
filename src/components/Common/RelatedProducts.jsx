import React from 'react'
import SingleProductCard from './SingleProductCard';
import { getCategoryWiseProducts } from '@/database/queries';





const RelatedProducts = async ({ lang, dictionary, productInfo }) => {

    const relatedProductList = await getCategoryWiseProducts(productInfo?.category);


    return (
        <>

            {/*  related product */}
            <div className="container pb-16">

                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.relatedProducts}

                </h2>

                <div className="grid grid-cols-4 gap-6">

                    {relatedProductList?.map((eachNewItem) => (
                        <SingleProductCard
                            key={eachNewItem?.name}
                            eachNewItem={eachNewItem}
                            dictionary={dictionary}
                            lang={lang}
                        />
                    ))
                    }

                </div>
            </div>
            {/*  related product */}


        </>
    )
}

export default RelatedProducts
