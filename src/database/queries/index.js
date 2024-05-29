

import { cartModel } from "@/models/cart-model";
import { categoryModel } from "@/models/category-model";
import { colorModel } from "@/models/color-model";
import { orderDetailsModel } from "@/models/order-details-model";
import { productModel } from "@/models/product-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { sizeModel } from "@/models/size-model";
import { specificationModel } from "@/models/specification-model";
import { userAddressModel } from "@/models/user-addreess-model";
import { userModel } from "@/models/user-model";
import { userOrderModel } from "@/models/user-order-model";
import { wishlistModel } from "@/models/wishlist-model";
import connectMongo from "@/service/connectMongo";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";


const LAST_DAY_TO_CONSIDER_AS_NEW_ARRIVAL = 15;
const lastDayToConsiderAsTrending = 30;



// UTILITY FUNCTIONS
async function calculateAverageRatingAndReviewCount(products) {
    const productIds = products.map(product => product._id);

    // Aggregate ratings and reviews
    const aggregatedData = await ratingModel.aggregate([
        { $match: { productId: { $in: productIds } } },
        {
            $group: {
                _id: "$productId",
                averageRating: { $avg: "$ratings" },
                reviewCount: { $sum: 1 }
            }
        }
    ]);

    // Map aggregated data to products
    const aggregatedMap = aggregatedData.reduce((map, data) => {
        map[data._id.toString()] = data;
        return map;
    }, {});

    // Add average rating and review count to products
    return products.map(product => {
        const data = aggregatedMap[product._id.toString()] || { averageRating: 0, reviewCount: 0 };
        return { ...product, averageRating: data.averageRating, reviewCount: data.reviewCount };
    });
};


async function getWishlistItemsDetail(wishlists) {
    const wishlistIds = wishlists.map(wishlist => wishlist.productId);


    try {
        await connectMongo();

        // Get  products
        const products = await productModel
            .find({ _id: { $in: wishlistIds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
            .limit(8)
            .lean();

        // Iterate through each product and calculate average rating and review count
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(products);

        // console.log(categoryWiseProductsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);


    } catch (error) {
        console.error("Error fetching category wise products:", error);
        return [];
    }
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
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - LAST_DAY_TO_CONSIDER_AS_NEW_ARRIVAL);
        const fifteenDaysAgoInMilliseconds = fifteenDaysAgo.getTime();

        // Get new arrival products within the last 15 days
        const newArrivalProducts = await productModel
            .find({ lastModified: { $gte: fifteenDaysAgoInMilliseconds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
            .limit(8)
            .lean();

        // Check if there are any products to process
        if (newArrivalProducts.length === 0) {
            return [];
        }

        // Calculate average rating and review count for each product
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(newArrivalProducts);

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

        const latestOrders = await orderDetailsModel
            .find()
            // .find({ orderDate: { $gte: fifteenDaysAgoInMilliseconds } })
            .limit(8)
            .lean();

        const filteredData = latestOrders?.filter((data) => data?.orderDate >= fifteenDaysAgoInMilliseconds);
        // console.log(filteredData)

        const productIds = filteredData?.map((product) => product.productId)

        const filteredProducts = await productModel
            .find({ _id: { $in: productIds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
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
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
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
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "category", "size", "color", "availableCount"])
            .lean();


        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(products);

        // console.log(productsWithAverageRatingAndReviewCount);
        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching products by filtering:", error);
        return [];
    }
};














// USER PART
export async function getUserByEmail(email) {
    try {
        const users = await userModel.find({ email: email }).lean();
        return replaceMongoIdInObject(users[0]);
    } catch (error) {
        console.error('Error fetching user account by email:', error);
        throw error;
    }
};


// export async function getUserAccountByEmail(email) {
//     try {
//         // Find the user by email
//         // const user = await userModel.findOne({ email }).lean();

//         // if (!user) {
//         //     throw new Error('User not found');
//         // }

//         // Find the account associated with the user
//         // const account = await accountModel.findOne({ userId: user._id }).lean();

//         // if (!account) {
//         //     throw new Error('Account not found for this user');
//         // }

//         const wishlistItems = await wishlistModel.find({ userId: user._id.toString() }).lean();

//         const wishlistItemsDetail = await getWishlistItemsDetail(wishlistItems);

//         // Join the two arrays based on productId from array1 and id from array2
//         const wishListWithProductData = (await replaceMongoIdInArray(wishlistItems)).map(wishlistData => {
//             const productData = wishlistItemsDetail.find(product => product.id === wishlistData.productId.toString());
//             return { ...productData, wishlistData };
//         });

//         return ({
//             account: replaceMongoIdInObject(account),
//             wishlistItems: wishListWithProductData
//         });


//     } catch (error) {
//         console.error('Error fetching user account by email:', error);
//         throw error;
//     }
// };

export async function getUserAccountByUserId(userId) {
    try {

        const wishlistItems = await wishlistModel.find({ userId: userId }).lean();

        const wishlistItemsDetail = await getWishlistItemsDetail(wishlistItems);

        // Join the two arrays based on productId from array1 and id from array2
        const wishListWithProductData = (await replaceMongoIdInArray(wishlistItems)).map(wishlistData => {
            const productData = wishlistItemsDetail.find(product => product.id === wishlistData.productId.toString());
            return { ...productData, wishlistData };
        });


        const cartItems = await cartModel.find({ userId: userId }).lean();

        const cartItemsDetail = await getWishlistItemsDetail(cartItems);

        // Join the two arrays based on productId from array1 and id from array2
        const cartWithProductData = (await replaceMongoIdInArray(cartItems)).map(cartData => {
            const productData = cartItemsDetail.find(product => product.id === cartData.productId.toString());
            return { ...productData, cartData };
        });

        return ({
            wishlistItems: wishListWithProductData,
            cartItems: cartWithProductData
        });


    } catch (error) {
        console.error('Error fetching user account by email:', error);
        throw error;
    }
};

// WISHLIST
export const addToWishlist = async (userId, productId) => {
    try {

        // Check if the product is already in the wishlist
        const existingWishlistItem = await wishlistModel.findOne({ userId, productId });

        if (existingWishlistItem) {
            // If the product is already in the wishlist, you can handle this scenario based on your requirements.
            // For example, you might want to update the addedTime or return a message indicating that the product is already in the wishlist.
            // Here, I'm just returning without doing anything.
            return {
                message: "Product is already in wishlist.",
                newItem: null
            };
        }

        // If the product is not already in the wishlist, add it
        const newItemResponse = await wishlistModel.create({ userId, productId, addedTime: new Date() });

        const newItem = newItemResponse.toObject()

        const newItemDetails = await getWishlistItemsDetail([{ productId: newItem?.productId }]);


        const generatedResponse = {
            ...newItemDetails?.[0],
            wishlistData: await replaceMongoIdInObject(newItem)
        }

        return {
            message: "Product added to wishlist successfully.",
            newItem: generatedResponse
        }; // Return the newly created item
    } catch (error) {
        throw new Error('Error adding product to wishlist: ' + error.message);
    }
};

// Function to delete an item from the wishlist in the database
export const removeFromWishlist = async (wishlistItemId) => {
    try {

        // Delete the item from the database
        await wishlistModel.findByIdAndDelete(wishlistItemId);

        return true;
    } catch (error) {
        throw new Error('Error deleting item from wishlist: ' + error.message);
    }
};

// user profile
export const getUserAddress = async (userId) => {
    try {

        // Delete the item from the database
        const userAddress = await userAddressModel.findOne({ userId }).lean();

        // console.log(userAddress);
        return userAddress ? userAddress : {};
    } catch (error) {
        throw new Error('Error getting user address: ' + error.message);
    }
};

export const addToUserAddress = async (userGivenAddress) => {
    try {

        // Delete the item from the database
        const userAddress = await userAddressModel.create(userGivenAddress);

        return userAddress ? userAddress.toObject() : {};
    } catch (error) {
        throw new Error('Error getting user address: ' + error.message);
    }
};

export const updateUserAddress = async (addressId, userGivenAddress) => {
    try {
        // Find the user address document by addressId
        let userAddress = await userAddressModel.findById(addressId);

        if (!userAddress) {
            throw new Error('User address not found');
        }

        // Update the shipping address if provided
        if (userGivenAddress.shippingAddress) {
            userAddress.shippingAddress = { ...userAddress.shippingAddress, ...userGivenAddress.shippingAddress };
        }

        // Update the billing address if provided
        if (userGivenAddress.billingAddress) {
            userAddress.billingAddress = { ...userAddress.billingAddress, ...userGivenAddress.billingAddress };
        }

        // Save the updated user address document
        userAddress = await userAddress.save();

        return userAddress ? userAddress.toObject() : {};
    } catch (error) {
        throw new Error('Error updating user address: ' + error.message);
    }
};

// CART LIST
export const addToCartList = async (requestData) => {
    try {

        // Check if the product is already in the cart
        const existingCartItem = await cartModel.findOne({ userId: requestData?.userId, productId: requestData?.productId }).lean();


        if (existingCartItem) {
            // If the product is already in the cart, update the productCount
            const updatedCartItem = await cartModel.findOneAndUpdate(
                { userId: requestData.userId, productId: requestData.productId },
                { $inc: { productCount: requestData.productCount } }, // Increment productCount by 1
                { new: true } // Return the updated document
            ).lean();


            if (updatedCartItem) {
                // If the item is successfully updated, return the updated item details
                const updatedItemDetails = await getWishlistItemsDetail([{ productId: updatedCartItem.productId }]);

                const generatedResponse = {
                    ...updatedItemDetails?.[0],
                    cartListData: await replaceMongoIdInObject(updatedCartItem)
                };

                return {
                    message: "Product quantity updated in cart.",
                    newItem: generatedResponse
                };
            }
        } else {
            // If the product is not already in the cart, add it
            const newItemResponse = await cartModel.create(requestData);

            const newItem = newItemResponse.toObject();

            const newItemDetails = await getWishlistItemsDetail([{ productId: newItem?.productId }]);

            const generatedResponse = {
                ...newItemDetails?.[0],
                cartListData: await replaceMongoIdInObject(newItem)
            };

            return {
                message: "Product added to cart successfully.",
                newItem: generatedResponse
            };
        }
    } catch (error) {
        throw new Error('Error adding product to cart: ' + error.message);
    }
};

// Function to delete an item from the wishlist in the database
export const removeFromCartList = async (cartId) => {
    try {

        // Delete the item from the database
        await cartModel.findByIdAndDelete(cartId);

        return true;
    } catch (error) {
        throw new Error('Error deleting item from wishlist: ' + error.message);
    }
};








// CREATE ORDER
export const createOrder = async (requestData) => {
    try {

        console.log(requestData);


        // UPDATE USER ADDRESS IF USER UPDATE ITS
        const updateAddress = updateUserAddress(requestData?.userAddress?._id,
            {
                shippingAddress: requestData?.userAddress?.shippingAddress,
                billingAddress: requestData?.userAddress?.billingAddress
            }
        );
        console.log(updateAddress);

        // CREATE ORDER
        const orders = {};
        for (const order of requestData?.userOrderList) {
            const newOrder = new orderDetailsModel({
                productId: order.cartData.productId,
                userId: order.cartData.userId,
                price: order.price,
                count: order.cartData.productCount,
                status: 'pending' // You might want to adjust this
            });
            const savedOrder = await newOrder.save();

            orders[order.cartData.productId] = savedOrder.toObject();
        }
        console.log(orders);


        // Create user orders
        const userOrders = [];
        for (const productId in orders) {
            const order = orders[productId];
            const totalPrice = order.price * order.count;
            const newUserOrder = new userOrderModel({
                orderDetailsId: [order._id],
                userId: order.userId,
                status: order.status,
                totalPrice: totalPrice,
                orderTime: order.orderTime,
                invoiceImage: '' // You can fill this with the invoice image path if available
            });
            const savedUserOrder = await newUserOrder.save();
            userOrders.push(savedUserOrder.toObject());
        }
        console.log(userOrders);


        // Remove The Products from Cart
        // Delete all cart entries for the given user
        const result = await cartModel.deleteMany({ userId: requestData?.userAddress?.userId });
        console.log(`Cleared ${result.deletedCount} cart entries for user ${requestData?.userAddress?.userId}`);


        // REDUCE PRODUCT'S AVAILABLE COUNT
        for (const productId in orders) {
            const order = orders[productId];
            const product = await productModel.findById(productId);
            if (!product) {
                console.error(`Product with ID ${productId} not found.`);
                continue;
            }
            product.availableCount -= order.count;
            await product.save();
            console.log(`Updated available count for product ${productId}`);
        }


        return true;


    } catch (error) {
        throw new Error('Error Creating Order: ' + error);
    }
};

