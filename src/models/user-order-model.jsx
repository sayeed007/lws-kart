import mongoose, { Schema } from "mongoose";

const userOrderSchema = new Schema({
    orderDetailsId: [{ type: Schema.Types.ObjectId, ref: 'orderDetails' }], // Array of ObjectIds referencing orderDetails table
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Assuming user details are stored in a separate collection
    status: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    orderTime: { type: Date, default: Date.now },
    invoiceImage: { type: String } // You can store the path to the invoice image or use a cloud storage URL
});

export const userOrderModel = mongoose.models.userOrder ?? mongoose.model("userOrder", userOrderSchema);
