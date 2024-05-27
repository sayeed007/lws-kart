import mongoose, { Schema } from "mongoose";

const wishlistSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' }, // Reference to the product
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Reference to the user
    addedTime: { type: Date, default: Date.now } // Time when the product was added to the wishlist
});

export const wishlistModel = mongoose.models.wishlist ?? mongoose.model("wishlist", wishlistSchema);
