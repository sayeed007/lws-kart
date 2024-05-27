import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    division: { type: String, require: true }, // Division
    district: { type: String, require: true }, // District
    thana: { type: String, require: true }, // Thana/Sub-district
    postOffice: { type: String, require: true }, // Post office
    village: { type: String, require: true }, // Village (optional)
    road: { type: String },
    house: { type: String, require: true },
    mobile: { type: Number, require: true }, // Additional note (optional)
    note: { type: String }, // Additional note (optional)

});

const userAddressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'users' }, // Reference to the user
    shippingAddress: { type: addressSchema }, // Shipping address object
    billingAddress: { type: addressSchema } // Billing address object
});

export const userAddressModel = mongoose.models.userAddress ?? mongoose.model("userAddress", userAddressSchema);

