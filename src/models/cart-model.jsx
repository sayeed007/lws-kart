import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' }, // Reference to the product
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Reference to the user
    addedTime: { type: Date, default: Date.now }, // Time when the product was added to the cart
    expirationTime: { type: Date }, // Optional expiration time for the product in the cart
    productCount: { type: Number, default: 1 } // Number of products added to the cart, default is 1
});

export const cartModel = mongoose.models.cart ?? mongoose.model("cart", cartSchema);