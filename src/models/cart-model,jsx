import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' }, // Reference to the product
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Reference to the user
    addedTime: { type: Date, default: Date.now }, // Time when the product was added to the cart
    expirationTime: { type: Date }, // Optional expiration time for the product in the cart
    productCount: { type: Number, default: 1 } // Number of products added to the cart, default is 1
});

export const cartModel = mongoose.models.cart ?? mongoose.model("cart", cartSchema);


const sampleCartData = [
    {
        productId: "612345678901234567890123",
        userId: "612345678901234567890123",
        addedTime: new Date(),
        expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
        productCount: 2
    },
    {
        productId: "612345678901234567890124",
        userId: "612345678901234567890124",
        addedTime: new Date(),
        productCount: 1
    }
];

