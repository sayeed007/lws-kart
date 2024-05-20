import mongoose, { Schema } from "mongoose";

// Define the schema for the Rating collection
const ratingSchema = new Schema({
    orderDetailsId: { type: Schema.Types.ObjectId, required: true }, // ID of the order details associated with the rating
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'products' }, // ID of the product being rated, referencing the product collection
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' }, // ID of the user who submitted the rating, referencing the user collection
    rating: { type: Number, required: true, min: 1, max: 5 }, // Numerical value of the rating, ranging from 1 to 5
    createdAt: { type: Date, default: Date.now }, // Timestamp when the review was created
});

// Create the Rating model
export const ratingModel = mongoose.models.rating ?? mongoose.model("rating", ratingSchema);
