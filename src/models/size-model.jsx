import mongoose, { Schema } from "mongoose";

const sizeSchema = new Schema({
    sizeName: { type: String, required: true }, // Name of the size
    visibleName: { type: String },
    description: { type: String } // Description of the size (optional)
});

export const sizeModel = mongoose.models.size ?? mongoose.model("size", sizeSchema);

