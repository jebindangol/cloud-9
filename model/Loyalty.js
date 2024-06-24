import { ObjectId } from "mongodb";
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const loyaltySchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    loyalty_earn: {
      type: Schema.Types.Mixed,
      required: false,
      default: 50,
    },
    redeem_amount: {
      type: Schema.Types.Mixed,
      required: false,
      default: 0,
    },
    total_loyalty_point: {
      type: Schema.Types.Mixed,
      required: false,
      default: 50,
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    created_by: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

const Loyalty =
  mongoose.models.Loyalty || mongoose.model("Loyalty", loyaltySchema);
export default Loyalty;
