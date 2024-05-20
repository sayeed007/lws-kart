

import { categoryModel } from "@/models/category-model";
import { colorModel } from "@/models/color-model";
import { orderDetailsModel } from "@/models/order-details-model";
import { productModel } from "@/models/product-model";
import { productOrdersModel } from "@/models/product-orders-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { sizeModel } from "@/models/size-model";
import { specificationModel } from "@/models/specification-model";
import connectMongo from "@/service/connectMongo";
import { filterByAll, replaceMongoIdInArray, replaceMongoIdInArrayDuringFiltering, replaceMongoIdInObject } from "@/utils/data-util";
import mongoose, { Mongoose } from "mongoose";


const lastDayToConsiderAsNewArrival = 15;
const lastDayToConsiderAsTrending = 30;


async function calculateAverageRatingAndReviewCount(products) {
    return Promise.all(products?.map(async (product) => {
        try {
            // Fetch ratings for the current product
            const ratings = await ratingModel.find({ productId: product._id }).lean();

            // Calculate average rating
            const averageRating = ratings && ratings.length > 0 ?
                ratings.map(rating => rating.ratings).reduce((acc, rating) => acc + rating, 0) / ratings.length :
                0;

            // Fetch reviews count for the current product
            const reviewCount = await reviewModel.countDocuments({ productId: product._id });

            // Add average rating and review count to product object
            return { ...product, averageRating, reviewCount };
        } catch (error) {
            console.error(`Error processing product ${product._id}:`, error);
            return { ...product, averageRating: 0, reviewCount: 0 }; // Set default values in case of error
        }
    }));
};



export async function getAllCategories() {

    try {
        await connectMongo();

        const allCategories = await categoryModel.find().lean();

        // console.log(allCategories);
        return replaceMongoIdInArray(allCategories);

    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

};

export async function getAllSize() {

    try {
        await connectMongo();

        const allSizes = await sizeModel.find().lean();

        // console.log(allSizes);
        return replaceMongoIdInArray(allSizes);

    } catch (error) {
        console.error("Error fetching sizes:", error);
        return [];
    }

};

export async function getAllColors() {

    try {
        await connectMongo();

        const allColors = await colorModel.find().lean();

        // console.log(allColors);
        return replaceMongoIdInArray(allColors);

    } catch (error) {
        console.error("Error fetching colors:", error);
        return [];
    }

};


export async function getAllNewArrivalWithAverageRatingAndReviewCount() {
    try {
        await connectMongo();

        // Calculate the date 15 days ago
        const fifteenDaysAgo = new Date();

        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - lastDayToConsiderAsNewArrival);
        const fifteenDaysAgoInMilliseconds = fifteenDaysAgo.getTime();

        // Get new arrival products within the last 15 days
        const newArrivalProducts = await productModel
            .find({ lastModified: { $gte: fifteenDaysAgoInMilliseconds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images'])
            .limit(8)
            .lean();

        // Iterate through each product and calculate average rating and review count
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(newArrivalProducts);

        // console.log(productsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching new arrival products with average rating and review count:", error);
        return [];
    }
};


export async function getAllTrendingWithAverageRatingAndReviewCount() {
    try {
        await connectMongo();

        // Calculate the date 15 days ago
        const today = new Date();
        const fifteenDaysAgo = new Date(today.setDate(today.getDate() - lastDayToConsiderAsTrending));

        const fifteenDaysAgoInMilliseconds = fifteenDaysAgo.getTime();

        // console.log(fifteenDaysAgo)
        // console.log(fifteenDaysAgoInMilliseconds)

        const latestOrders = await productOrdersModel
            .find()
            // .find({ orderDate: { $gte: fifteenDaysAgoInMilliseconds } })
            .limit(8)
            .lean();

        const filteredData = latestOrders?.filter((data) => data?.orderDate >= fifteenDaysAgoInMilliseconds);
        // console.log(filteredData)

        const productIds = filteredData?.map((product) => product.productId)

        const filteredProducts = await productModel
            .find({ _id: { $in: productIds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images'])
            .lean();

        // Iterate through each product and calculate average rating and review count
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(filteredProducts);

        // console.log(productsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching new arrival products with average rating and review count:", error);
        return [];
    }
};


export async function getSpecificProductWithAverageRatingAndReviewCount(productId) {
    try {
        await connectMongo();

        // Get product by product id
        const specificProduct = await productModel
            .findById(productId)
            .lean();

        const ratings = await ratingModel.find({ productId: specificProduct?._id }).lean();

        // Calculate average rating
        const averageRating = ratings && ratings.length > 0 ?
            ratings.map(rating => rating.ratings).reduce((acc, rating) => acc + rating, 0) / ratings.length :
            0;

        // Fetch reviews count for the current product
        const reviewCount = await reviewModel.countDocuments({ productId: specificProduct._id });

        // Add average rating and review count to product object
        const productsWithAverageRatingAndReviewCount = {
            ...specificProduct,
            averageRating,
            reviewCount,
        };


        const categoryInfo = await categoryModel.findById(specificProduct?.category).lean();
        productsWithAverageRatingAndReviewCount['categoryInfo'] = { ...categoryInfo };


        const sizeInfo = await sizeModel.findById(specificProduct?.size).lean();
        productsWithAverageRatingAndReviewCount['sizeInfo'] = { ...sizeInfo };

        const colorInfo = await colorModel.findById(specificProduct?.color).lean();
        productsWithAverageRatingAndReviewCount['colorInfo'] = { ...colorInfo };

        const specificationInfo = await specificationModel.findById(specificProduct?.specificationId).lean();
        productsWithAverageRatingAndReviewCount['specificationInfo'] = { ...specificationInfo };



        // console.log(productsWithAverageRatingAndReviewCount);s
        return replaceMongoIdInObject(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching new arrival products with average rating and review count:", error);
        return [];
    }
};


export async function getCategoryWiseProducts(categoryId) {
    try {
        await connectMongo();

        // Get  products
        const categoryWiseProducts = await productModel
            .find({ category: categoryId })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images'])
            .limit(8)
            .lean();

        // Iterate through each product and calculate average rating and review count
        const categoryWiseProductsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(categoryWiseProducts);

        // console.log(categoryWiseProductsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(categoryWiseProductsWithAverageRatingAndReviewCount);


    } catch (error) {
        console.error("Error fetching category wise products:", error);
        return [];
    }
};



export async function getAllProductsByFiltering({ searchKeyWord, category, minPrice, maxPrice, size, color }) {
    try {
        await connectMongo();

        let query = {};

        // if (searchKeyWord) {
        //     query.$text = { $search: searchKeyWord };
        // }
        if (searchKeyWord) {
            query.$or = [
                { name: { $regex: new RegExp(searchKeyWord, "i") } },
                { details: { $regex: new RegExp(searchKeyWord, "i") } },
                { description: { $regex: new RegExp(searchKeyWord, "i") } }
                // Add more fields here if needed
            ];
        }

        if (category) {
            query.category = { $in: category };
        }

        if (minPrice !== undefined && maxPrice !== undefined) {
            query.price = { $gte: minPrice, $lte: maxPrice };
        } else if (minPrice !== undefined) {
            query.price = { $gte: minPrice };
        } else if (maxPrice !== undefined) {
            query.price = { $lte: maxPrice };
        }

        if (size) {
            query.size = size;
        }

        if (color) {
            query.color = color;
        }


        const products = await productModel
            .find(query)
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "category", "size", "color"])
            .lean();


        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(products);

        // console.log(productsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching products by filtering:", error);
        return [];
    }
}







