import mongoose from "mongoose";
const Schema = mongoose.Schema;
const shopsSchema = new Schema(
  {
    shop_name: {
      type: String,
      required: true,
      default: 50,
    },
  },
  { timestamps: true }
);

const Shop =
  mongoose.models.shops || mongoose.model("shops", shopsSchema);
export default Shop;
