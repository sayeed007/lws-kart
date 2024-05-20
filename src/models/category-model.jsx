import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true }, // Name of the category
    description: { type: String }, // Description of the category (optional)
    image: { type: String }, // category image(optional)
    totalProductCount: { type: Number } //Number of product in this category (optional)
});

export const categoryModel = mongoose?.models?.category ?? mongoose.model("category", categorySchema);
