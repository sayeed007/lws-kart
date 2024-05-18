import React from 'react'
import SingleProductCard from './SingleProductCard';



const relatedProducts = [
    {
        name: 'Guyer Chair',
        image: 'Product1',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'BED KING SIZE',
        image: 'Product2',
        oldPrice: 71.00,
        newPrice: 25.00,
        rating: 2.2,
        totalGivenRating: 140
    },
    {
        name: 'BED KING SIZE',
        image: 'Product3',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'MATTRASS X',
        image: 'Product4',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'Guyer Chair',
        image: 'Product1',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'BED KING SIZE',
        image: 'Product2',
        oldPrice: 71.00,
        newPrice: 25.00,
        rating: 2.2,
        totalGivenRating: 140
    },
    {
        name: 'BED KING SIZE',
        image: 'Product3',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    },
    {
        name: 'MATTRASS X',
        image: 'Product4',
        oldPrice: 55.00,
        newPrice: 45.00,
        rating: 3.2,
        totalGivenRating: 150
    }


];




const RelatedProducts = ({ dictionary }) => {
    return (
        <>

            {/*  related product */}
            <div className="container pb-16">

                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.relatedProducts}

                </h2>

                <div className="grid grid-cols-4 gap-6">

                    {relatedProducts?.map((eachNewItem) => (
                        <SingleProductCard
                            key={eachNewItem?.name}
                            eachNewItem={eachNewItem}
                            dictionary={dictionary}
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
