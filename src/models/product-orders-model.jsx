import mongoose, { Schema } from "mongoose";

const productOrdersSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'product' }, // Reference to the product
    orderId: { type: Schema.Types.ObjectId, required: true, ref: 'orderDetails' }, // Reference to the order
    orderDate: { type: Date, default: Date.now } // Date of the order
});

export const productOrdersModel = mongoose.models.productOrders ?? mongoose.model("productOrders", productOrdersSchema);


