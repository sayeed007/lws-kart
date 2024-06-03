

import InvoiceForEmail from "@/components/Account/InvoiceForEmail";
import sendMail from "@/mailSender/SendMail";
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
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import { render } from '@react-email/render';
import { getDictionary } from "../../../public/dictionary/dictionaries";


const LAST_DAY_TO_CONSIDER_AS_NEW_ARRIVAL = 15;
const lastDayToConsiderAsTrending = 30;

//
// ###################   UTILITY FUNCTIONS RELATED DB QUERY STARTS  ###################
// 

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


        // Get  products
        const products = await productModel
            .find({ _id: { $in: wishlistIds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
            .limit(8)
            .lean();

        // Calculate actual available count for each product
        for (const product of products) {
            // Fetch cart items for this product with expiration time in the future
            const cartItems = await cartModel.find({
                productId: product._id,
                expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
            }).lean();

            // Calculate total product count in the cart
            const totalProductCountInCart = cartItems.reduce((total, item) => total + item.productCount, 0);

            // Subtract total product count in the cart from available count
            product.availableCount = product.availableCount - totalProductCountInCart;
        }


        // Iterate through each product and calculate average rating and review count
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(products);

        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);


    } catch (error) {
        console.error("Error fetching category wise products:", error);
        return [];
    }
};



//
// ###################   UTILITY FUNCTIONS RELATED DB QUERY ENDS  ###################
//














//
// ###################   GENERAL VISITOR RELATED DB QUERY STARTS  ###################
// 


export async function getAllCategories() {

    try {


        const allCategories = await categoryModel.find().lean();

        return replaceMongoIdInArray(allCategories);

    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }

};

export async function getAllSize() {

    try {


        const allSizes = await sizeModel.find().lean();

        return replaceMongoIdInArray(allSizes);

    } catch (error) {
        console.error("Error fetching sizes:", error);
        return [];
    }

};

export async function getAllColors() {

    try {


        const allColors = await colorModel.find().lean();

        return replaceMongoIdInArray(allColors);

    } catch (error) {
        console.error("Error fetching colors:", error);
        return [];
    }

};

export async function getAllNewArrivalWithAverageRatingAndReviewCount() {
    try {


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

        // Calculate actual available count for each product
        for (const product of newArrivalProducts) {
            // Fetch cart items for this product with expiration time in the future
            const cartItems = await cartModel.find({
                productId: product._id,
                expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
            }).lean();

            // Calculate total product count in the cart
            const totalProductCountInCart = cartItems.reduce((total, item) => total + item.productCount, 0);

            // Subtract total product count in the cart from available count
            product.availableCount = product.availableCount - totalProductCountInCart;
        }


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


        // Calculate the date 15 days ago
        const today = new Date();
        const fifteenDaysAgo = new Date(today.setDate(today.getDate() - lastDayToConsiderAsTrending));

        const fifteenDaysAgoInMilliseconds = fifteenDaysAgo.getTime();


        const latestOrders = await orderDetailsModel
            // .find()
            .find({ orderTime: { $gte: fifteenDaysAgoInMilliseconds } })
            .limit(8)
            .lean();

        const productIds = latestOrders?.map((product) => product.productId);

        const filteredProducts = await productModel
            .find({ _id: { $in: productIds } })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
            .lean();

        // Calculate actual available count for each product
        for (const product of filteredProducts) {
            // Fetch cart items for this product with expiration time in the future
            const cartItems = await cartModel.find({
                productId: product._id,
                expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
            }).lean();

            // Calculate total product count in the cart
            const totalProductCountInCart = cartItems?.reduce((total, item) => total + item?.productCount, 0);

            // Subtract total product count in the cart from available count
            product.availableCount = product.availableCount - totalProductCountInCart;
        }

        // Iterate through each product and calculate average rating and review count
        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(filteredProducts);

        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching new arrival products with average rating and review count:", error);
        return [];
    }
};

export async function getSpecificProductWithAverageRatingAndReviewCount(productId) {
    try {


        // Get product by product id
        const specificProduct = await productModel
            .findById(productId)
            .lean();

        // Calculate actual available count for each product
        const cartItems = await cartModel.find({
            productId: productId,
            expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
        }).lean();

        // Calculate total product count in the cart
        const totalProductCountInCart = cartItems.reduce((total, item) => total + item.productCount, 0);

        // Subtract total product count in the cart from available count
        specificProduct.availableCount = specificProduct.availableCount - totalProductCountInCart;

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



        return replaceMongoIdInObject(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching new arrival products with average rating and review count:", error);
        return [];
    }
};

export async function getCategoryWiseProducts(categoryId) {
    try {


        // Get  products
        const categoryWiseProducts = await productModel
            .find({ category: categoryId })
            .select(["name", "price", "discountAvailable", "discountPercent", 'images', "availableCount"])
            .limit(8)
            .lean();

        // Calculate actual available count for each product
        for (const product of categoryWiseProducts) {
            // Fetch cart items for this product with expiration time in the future
            const cartItems = await cartModel.find({
                productId: product._id,
                expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
            }).lean();

            // Calculate total product count in the cart
            const totalProductCountInCart = cartItems.reduce((total, item) => total + item.productCount, 0);

            // Subtract total product count in the cart from available count
            product.availableCount = product.availableCount - totalProductCountInCart;
        }

        // Iterate through each product and calculate average rating and review count
        const categoryWiseProductsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(categoryWiseProducts);

        return replaceMongoIdInArray(categoryWiseProductsWithAverageRatingAndReviewCount);


    } catch (error) {
        console.error("Error fetching category wise products:", error);
        return [];
    }
};

export async function getAllProductsByFiltering({ searchKeyWord, category, minPrice, maxPrice, size, color }) {
    try {


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

        // Calculate actual available count for each product
        for (const product of products) {
            // Fetch cart items for this product with expiration time in the future
            const cartItems = await cartModel.find({
                productId: product._id,
                expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
            }).lean();

            // Calculate total product count in the cart
            const totalProductCountInCart = cartItems.reduce((total, item) => total + item.productCount, 0);

            // Subtract total product count in the cart from available count
            product.availableCount = product.availableCount - totalProductCountInCart;
        }


        const productsWithAverageRatingAndReviewCount = await calculateAverageRatingAndReviewCount(products);

        return replaceMongoIdInArray(productsWithAverageRatingAndReviewCount);
    } catch (error) {
        console.error("Error fetching products by filtering:", error);
        return [];
    }
};


//
// ###################   GENERAL VISITOR RELATED DB QUERY STARTS  ###################
//







//      @@@@@@@@@@@@@@@@@@@@@@@@@@@@      AUTHORIZED QUERY STARTS      @@@@@@@@@@@@@@@@@@@@@@@@@@@@                    





//
// ###################   USER WISHLIST RELATED DB QUERY STARTS  ###################
// 

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

        const wishlistItems = await wishlistModel.find({ userId: userId }).lean();

        const wishlistItemsDetail = await getWishlistItemsDetail(wishlistItems);

        // Join the two arrays based on productId from array1 and id from array2
        const wishListWithProductData = (await replaceMongoIdInArray(wishlistItems)).map(wishlistData => {
            const productData = wishlistItemsDetail.find(product => product.id === wishlistData.productId.toString());
            return { ...productData, wishlistData };
        });

        return {
            message: "Product added to wishlist successfully.",
            wishedProduct: wishListWithProductData
        }; // Return the newly created item
    } catch (error) {
        throw new Error('Error adding product to wishlist: ' + error.message);
    }
};

// Function to delete an item from the wishlist in the database
export const removeFromWishlist = async (wishlistItemId) => {
    try {


        // Delete the item from the database
        const deleteFromWishList = await wishlistModel.findByIdAndDelete(wishlistItemId).lean();

        return deleteFromWishList?._id ? true : false;
    } catch (error) {
        throw new Error('Error deleting item from wishlist: ' + error.message);
    }
};

//
// ###################   USER WISHLIST RELATED DB QUERY STARTS  ###################
// 


//
// ###################   USER CART RELATED DB QUERY STARTS  ###################
// 

export const addToCartList = async (requestData) => {
    try {


        // Get the product details
        const product = await productModel.findById(requestData.productId).lean();

        if (!product) {
            return {
                addToCartList: false,
                message: 'Product not found',
            }
            // throw new Error("Product not found.");
        };

        // PRODUCT COUNT IN CART
        const allExistingCartItems = await cartModel.find({
            productId: requestData.productId,
            expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
        }).lean();

        // Calculate total product count in the cart
        const totalProductCountInCart = allExistingCartItems.reduce((total, item) => total + item.productCount, 0);

        // Check if the product is already in the cart for the user
        const existingCartItem = await cartModel.findOne({
            userId: requestData.userId,
            productId: requestData.productId,
            expirationTime: { $gt: new Date() }
        }).lean();

        // Calculate the maximum quantity user can add based on available count and expiration time
        const availableCount = product.availableCount;
        // const cartProductCount = existingCartItem.productCount;
        const totalAvailableCount = availableCount - totalProductCountInCart;

        if (existingCartItem) {

            // Check if the requested quantity exceeds the available count
            if (totalAvailableCount === 0) {
                return {
                    addToCartList: false,
                    message: `${product.name} is not available in stock.`
                };
            }
            if (requestData.productCount > totalAvailableCount) {
                return {
                    addToCartList: false,
                    message: `Only ${totalAvailableCount} ${product.name}(s) available in stock.`
                };
            }

            // If the product is already in the cart, update the productCount
            const updatedCartItem = await cartModel.findOneAndUpdate(
                { userId: requestData.userId, productId: requestData.productId },
                { $inc: { productCount: requestData.productCount } }, // Set productCount to requested value
                { new: true } // Return the updated document
            ).lean();

            if (updatedCartItem) {

                const cartData = await getUserCart(requestData.userId);

                return {
                    addToCartList: true,
                    message: "Product quantity updated in cart.",
                    cartItems: cartData
                };
            };

        } else {


            // Check if the requested quantity exceeds the available count
            if (totalAvailableCount === 0) {
                return {
                    addToCartList: false,
                    message: `${product.name} is not available in stock.`
                };
            }
            if (requestData.productCount > totalAvailableCount) {
                return {
                    addToCartList: false,
                    message: `Only ${totalAvailableCount} ${product.name}(s) available in stock.`
                };
            }

            // Add the product to the cart
            const newItemResponse = await cartModel.create(requestData);

            // const newItem = newItemResponse.toObject();
            // const newItemDetails = await getWishlistItemsDetail([{ productId: newItem.productId }]);
            // const generatedResponse = {
            //     ...newItemDetails?.[0],
            //     cartListData: await replaceMongoIdInObject(newItem)
            // };

            const cartData = await getUserCart(requestData.userId);

            return {
                addToCartList: true,
                message: "Product added to cart successfully.",
                cartItems: cartData
            };
        }
    } catch (error) {
        return {
            addToCartList: false,
            message: 'Error adding product to cart: ' + error.message,
        };
        // throw new Error('Error adding product to cart: ' + error.message);
    }
};

// Function to delete an item from the wishlist in the database
export const removeFromCartList = async (cartId) => {
    try {


        // Delete the item from the database
        const deleteFromCart = await cartModel.findByIdAndDelete(cartId).lean();

        return deleteFromCart?._id ? true : false;
    } catch (error) {
        throw new Error('Error deleting item from wishlist: ' + error.message);
    }
};

export const getUserCart = async (userId) => {
    try {

        // Fetch the user's cart items with future expiration time
        const userCart = await cartModel.find({
            userId: userId,
            expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
        }).lean();

        const modifiedUserCart = await replaceMongoIdInArray(userCart);

        // Define an array to store the formatted cart items
        const formattedCart = [];

        // Iterate over each cart item
        for (const cartItem of modifiedUserCart) {
            // Call getWishlistItemsDetail for each cart item
            const itemDetails = await getWishlistItemsDetail([{ productId: cartItem.productId }]);

            // Store the return value along with the corresponding cart item
            formattedCart.push({
                ...itemDetails?.[0],
                cartData: cartItem
            });
        };

        // Return the formatted cart items
        return formattedCart;
    } catch (error) {
        throw new Error('Error getting user cart: ' + error.message);
    }
};


//
// ###################   USER CART RELATED DB QUERY ENDS  ###################
//



//
// ###################   USER ORDER RELATED DB QUERY STARTS  ###################
// 

// GET USER Ongoing Order
export const getUserOngoingOrder = async (userId) => {
    try {


        const ongoingOrders = await userOrderModel.find({
            userId: userId,
            status: { $in: ['pending', 'shipping'] }
        }).populate({
            path: 'orderDetailsId',
            populate: {
                path: 'productId',
                model: 'product',
                select: ['name', 'discountPercent', 'images']
            }
        }).lean();

        return replaceMongoIdInArray(ongoingOrders);
    } catch (error) {
        console.error('Error fetching ongoing orders:', error);
        throw error;
    }
};

// GET USER Previous Order
export const getUserPreviousOrder = async (userId) => {
    try {


        const previousOrders = await userOrderModel.find({ userId: userId, status: { $in: ['delivered', 'canceled'] } }).populate({
            path: 'orderDetailsId',
            populate: {
                path: 'productId',
                model: 'product',
                select: ['name', 'discountPercent', 'images']
            }
        }).lean();

        return replaceMongoIdInArray(previousOrders);
    } catch (error) {
        console.error('Error fetching ongoing orders:', error);
        throw error;
    }
};

export const getSpecificOrder = async (invoiceId) => {
    try {

        const specificOrderDetails = await userOrderModel.findById(invoiceId).populate({
            path: 'orderDetailsId',
            populate: {
                path: 'productId',
                model: 'product',
                select: ['name', 'discountPercent', 'images']
            }
        }).lean();

        return replaceMongoIdInObject(specificOrderDetails);
    } catch (error) {
        console.error('Error fetching ongoing orders:', error);
        throw error;
    }
};


// CREATE ORDER
export const createOrder = async (requestData) => {
    try {


        // UPDATE USER ADDRESS IF USER MODIFY THIS
        const userProvidedAddress = requestData?.userAddress;
        let userCurrentAddress = {};

        if (userProvidedAddress?.id) {
            const updatedUserAddress = await updateUserAddress(userProvidedAddress?.id, userProvidedAddress);
            userCurrentAddress = updatedUserAddress;
        } else {
            const addUserAddress = addToUserAddress(userProvidedAddress);
            userCurrentAddress = addUserAddress;
        }


        const orders = {}; // Object to store orders grouped by user
        const userOrders = []; // Array to store user orders

        // Iterate over each order item
        for (const order of requestData?.userOrderList) {
            const productId = order.cartData.productId;
            const userId = order.cartData.userId;

            // Create order details
            const newOrderDetail = new orderDetailsModel({
                productId: productId,
                userId: userId,
                price: order.price,
                count: order.cartData.productCount,
                status: 'pending'
            });
            const savedOrderDetail = await newOrderDetail.save();

            // Add order detail to respective user's order
            if (!orders[userId]) {
                orders[userId] = {
                    userId: userId,
                    totalPrice: 0,
                    orderDetailsId: []
                };
            }
            orders[userId].totalPrice += order.price * order.cartData.productCount;
            orders[userId].orderDetailsId.push(savedOrderDetail._id);
        }

        // Create user orders
        for (const userId in orders) {
            const userData = orders[userId];
            const newUserOrder = new userOrderModel({
                orderDetailsId: userData.orderDetailsId,
                userId: userData.userId,
                status: 'pending',
                totalPrice: userData.totalPrice,
                orderTime: new Date(), // You might want to adjust this
                invoiceImage: '' // You can fill this with the invoice image path if available
            });
            const savedUserOrder = await newUserOrder.save();
            userOrders.push(savedUserOrder.toObject());
        }

        // Remove The Products from Cart
        const result = await cartModel.deleteMany({ userId: requestData?.userAddress?.userId });

        // Update product available count
        for (const userId in orders) {
            const userData = orders[userId];
            for (const orderDetailId of userData.orderDetailsId) {
                const orderDetail = await orderDetailsModel.findById(orderDetailId);
                if (!orderDetail) {
                    console.error(`Order detail with ID ${orderDetailId} not found.`);
                    continue;
                }
                const product = await productModel.findById(orderDetail.productId);
                if (!product) {
                    console.error(`Product with ID ${orderDetail.productId} not found.`);
                    continue;
                }
                product.availableCount -= orderDetail.count;
                await product.save();
            }
        }


        // NECESSARY DATA FOR MAIL SENDING
        const userCurrentOrderInvoiceId = (userOrders?.[0]?._id).toString();

        const currentOrderDetails = await getSpecificOrder(userCurrentOrderInvoiceId);


        const returnObject = {
            userId: requestData.userAddress.userId,
            userOrders: currentOrderDetails,
            userAddress: userCurrentAddress,
        };

        return returnObject;
    } catch (error) {
        throw new Error('Error Creating Order: ' + error);
    }
};

//
// ###################   USER ORDER RELATED DB QUERY ENDS  ###################
//




//
// ###################   USER INFORMATION RELATED DB QUERY STARTS  ###################
//

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

export async function getUserAccountByUserId(userId) {
    try {


        const wishlistItems = await wishlistModel.find({ userId: userId }).lean();

        const wishlistItemsDetail = await getWishlistItemsDetail(wishlistItems);

        // Join the two arrays based on productId from array1 and id from array2
        const wishListWithProductData = (await replaceMongoIdInArray(wishlistItems)).map(wishlistData => {
            const productData = wishlistItemsDetail.find(product => product.id === wishlistData.productId.toString());
            return { ...productData, wishlistData };
        });

        const cartItems = await cartModel.find({
            userId: userId,
            expirationTime: { $gt: new Date() } // Only consider items with expiration time in the future
        }).lean();

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
        console.error('Error fetching user wish list items and cart list items by user id:', error);
        throw error;
    }
};

// user profile
export const getUserAddress = async (userId) => {
    try {


        // Delete the item from the database
        const userAddress = await userAddressModel.findOne({ userId }).lean();

        return userAddress ? replaceMongoIdInObject(userAddress) : {};
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

export const updateUserInfo = async (userId, userProvidedData) => {
    try {


        // Find the user document by userId
        let userData = await userModel.findById(userId);

        if (!userData) {
            throw new Error('User not found');
        }

        // Exclude password field from the update
        delete userProvidedData.password;

        // Update user data with provided data
        Object.assign(userData, userProvidedData);

        // Save the updated user document
        const modifiedUserData = await userData.save();

        return modifiedUserData ? replaceMongoIdInObject(modifiedUserData.toObject()) : {};
    } catch (error) {
        // return modifiedUserData
        throw new Error('Error updating user information: ' + error.message);
    }
};



//
// ###################   USER INFORMATION RELATED DB QUERY ENDS  ###################
//





// Function to send order confirmation email
export const sendOrderConfirmationEmail = async (userId, userOrders, userAddress) => {
    try {

        // Find the user email by userId
        const userData = await userModel.findById(userId).lean();

        const userEmail = userData.email;

        const userName = userData.name;

        const userCurrentOrderInvoice = userOrders?.id;

        const invoiceLink = `${process.env.WEBSITE_URL}/en/invoice/${userCurrentOrderInvoice}`;

        // const emailBody = `<p>Hello ${userName},</p><p>Thank you for your recent order. You can view your invoice by clicking the following link:</p><p><a href="${invoiceLink}">View Invoice</a></p>`;

        const emailBody = render(<InvoiceForEmail
            userName={userName}
            userOrders={userOrders}
            userAddress={userAddress}
            invoiceLink={invoiceLink}
        />
        );

        if (userEmail && userCurrentOrderInvoice) {
            await sendMail({
                to: userEmail,
                subject: 'Invoice for your recent order',
                text: `Hello ${userName},\n\nThank you for your recent order. You can view your invoice by clicking the following link: ${invoiceLink}`,
                html: emailBody
            });
        };

        return true;

    } catch (error) {
        console.error('Error sending order confirmation email:', error);
        throw new Error('Error sending order confirmation email');
    }
};













