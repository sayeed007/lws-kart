import mongoose, { Schema } from "mongoose";

const accountSchema = new Schema({
    access_token: { type: String, required: true },
    id_token: { type: String, required: true },
    expires_at: { type: Number, required: true },
    scope: { type: String, required: true },
    token_type: { type: String, required: true },
    providerAccountId: { type: String, required: true },
    provider: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

export const accountModel = mongoose.models.account ?? mongoose.model("account", accountSchema);
