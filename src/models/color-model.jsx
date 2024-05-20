import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema({
    colorName: { type: String, required: true }, // Name of the color
    description: { type: String } // Description of the color (optional)
});

export const colorModel = mongoose.models.color ?? mongoose.model("color", colorSchema);


const sampleColorData = [
    {
        colorName: "Red",
        description: "A vibrant and bold shade of red"
    },
    {
        colorName: "Blue",
        description: "A calming and serene shade of blue"
    },
    {
        colorName: "Green",
        description: "A refreshing and natural shade of green"
    }
];

