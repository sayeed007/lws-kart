import React from 'react'
import SingleProductCard from '../Common/SingleProductCard';



const trendingProducts = [
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


const Product = ({ dictionary }) => {
    return (
        <>
            {/* product */}
            <div className="container pb-16">
                <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
                    {dictionary?.trendingProducts}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {trendingProducts?.map((eachNewItem) => (
                        <SingleProductCard
                            key={eachNewItem?.name}
                            eachNewItem={eachNewItem}
                            dictionary={dictionary}
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
