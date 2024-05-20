import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true }, // Name of the product
    details: { type: String }, // Details of the product
    description: { type: String }, // Description of the product
    price: { type: Number, required: true }, // Price of the product
    availableCount: { type: Number, required: true }, // Available count of the product
    addedDate: { type: Date, default: Date.now }, // Date when the product was added
    brand: { type: String }, // Brand of the product
    category: { type: Schema.Types.ObjectId, ref: 'category' }, // Reference to the category
    size: { type: Schema.Types.ObjectId, ref: 'size' }, // Reference to the size
    color: { type: Schema.Types.ObjectId, ref: 'color' }, // Reference to the color
    discountAvailable: { type: Boolean, default: false }, // Indicates if discount is available for the product
    discountPercent: { type: Number },
    productCode: { type: String }, // Product code or SKU
    shortName: { type: String }, // Short name or title of the product
    specificationId: { type: Schema.Types.ObjectId, ref: 'specification' }, // Reference to the product specification
    images: [{ type: String }], // List of images for the product
    status: { type: Schema.Types.ObjectId, ref: 'productStatus' } // Reference to the status of the product
});

productSchema.index({ name: 'text', details: 'text', description: 'text' }, { default_language: "en" });


export const productModel = mongoose.models.product ?? mongoose.model("product", productSchema);
