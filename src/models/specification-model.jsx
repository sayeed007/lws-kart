import mongoose, { Schema } from "mongoose";

const specificationSchema = new Schema({
    description: { type: String, required: true } // Description of the specification
});

export const specificationModel = mongoose.models.specification ?? mongoose.model("specification", specificationSchema);

const sampleSpecificationData = [
    {
        description: "Dimensions: 10 x 5 x 2 inches"
    },
    {
        description: "Weight: 1.5 lbs"
    },
    {
        description: "Material: Stainless steel"
    }
];

