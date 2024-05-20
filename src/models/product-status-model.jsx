import mongoose, { Schema } from "mongoose";

const productStatusSchema = new Schema({
    statusName: { type: String, required: true }, // Name of the status
    description: { type: String } // Description of the status (optional)
});

export const productStatusModel = mongoose.models.productStatus ?? mongoose.model("productStatus", productStatusSchema);


const sampleProductStatusData = [
    {
        statusName: "Available",
        description: "Product is currently available for purchase"
    },
    {
        statusName: "Out of Stock",
        description: "Product is currently out of stock"
    }
];

