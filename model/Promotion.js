import mongoose from "mongoose";
const Schema = mongoose.Schema;
const promotionsSchema = new Schema(
  {
    img: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: false,
      default: ""
    },
    offer: {
      type: String,
      required: false,
      default: ""
    },
    link: {
      type: String,
      required: false,
      default: "/sale-and-promotion"
    }
  },
  { timestamps: true }
);

const Promotion =
  mongoose.models.promotions || mongoose.model("promotions", promotionsSchema);
export default Promotion;
