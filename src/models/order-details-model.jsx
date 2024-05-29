import mongoose, { Schema } from "mongoose";

const orderDetailsSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' }, // Reference to the product
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Reference to the user
    price: { type: Number, required: true }, // Price per piece
    count: { type: Number, required: true }, // Number of pieces ordered
    orderTime: { type: Date, default: Date.now }, // Order time
    discount: { type: Number, default: 0 }, // Optional discount
    status: { type: String, required: true } // Status of the order
});

export const orderDetailsModel = mongoose.models.orderDetails ?? mongoose.model("orderDetails", orderDetailsSchema);


