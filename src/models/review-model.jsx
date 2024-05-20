import mongoose, { Schema } from "mongoose";

// Define the schema for the Review collection
const reviewSchema = new Schema({
    orderDetailsId: { type: Schema.Types.ObjectId, required: true }, // ID of the order details associated with the rating
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'producta' }, // ID of the product being reviewed, referencing the product collection
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' }, // ID of the user who submitted the review, referencing the user collection
    reviewText: { type: String, required: true }, // Text content of the review
    createdAt: { type: Date, default: Date.now }, // Timestamp when the review was created
});

// Create the Review model
export const reviewModel = mongoose.models.Review ?? mongoose.model("Review", reviewSchema);

