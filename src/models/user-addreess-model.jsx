import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
    house: { type: String },
    road: { type: String },
    division: { type: String }, // Division
    district: { type: String }, // District
    thana: { type: String }, // Thana/Sub-district
    postOffice: { type: String }, // Post office
    village: { type: String }, // Village (optional)
    note: { type: String } // Additional note (optional)
});

const userAddressSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' }, // Reference to the user
    shippingAddress: { type: addressSchema }, // Shipping address object
    billingAddress: { type: addressSchema } // Billing address object
});

export const userAddressModel = mongoose.models.userAddress ?? mongoose.model("userAddress", userAddressSchema);



const sampleUserAddressData = [
    {
        userId: "612345678901234567890123",
        shippingAddress: {
            house: "123",
            road: "Main Street",
            division: "Dhaka",
            district: "Dhaka",
            thana: "Gulshan",
            postOffice: "1212",
            village: "Example Village",
            note: "Near the park"
        },
        billingAddress: {
            house: "456",
            road: "Second Avenue",
            division: "Dhaka",
            district: "Dhaka",
            thana: "Banani",
            postOffice: "1234",
            village: "Another Village",
            note: "Next to the supermarket"
        }
    },
    {
        userId: "612345678901234567890124",
        shippingAddress: {
            house: "789",
            road: "Third Street",
            division: "Chittagong",
            district: "Chittagong",
            thana: "Agrabad",
            postOffice: "4000"
        },
        billingAddress: {
            house: "1011",
            road: "Fourth Avenue",
            division: "Chittagong",
            district: "Chittagong",
            thana: "Halishahar",
            postOffice: "4100"
        }
    }
];

// export default sampleUserAddressData;

