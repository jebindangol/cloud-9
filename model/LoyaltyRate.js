import mongoose from "mongoose";
const Schema = mongoose.Schema;
const loyaltyRateSchema = new Schema(
  {
    loyalty_conversion_rate: {
      type: Schema.Types.Mixed,
      required: true,
      default: 1,
    },
    reedem_conversion_rate: {
      type: Schema.Types.Mixed,
      required: true,
      default: 0.1,
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    modified_by: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const LoyaltyRate =
  mongoose.models.LoyaltyRate ||
  mongoose.model("LoyaltyRate", loyaltyRateSchema);
export default LoyaltyRate;
