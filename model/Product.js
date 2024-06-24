import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
    category_id: {
        type: String,
        required: true
    },
    brand_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: Schema.Types.Mixed,
        required: false
    },
    inventory: {
        type: Schema.Types.Mixed,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sale: {
        type: Schema.Types.Mixed,
        required: false
    },
    relatedProductIds: {
        type: Array,
        required: false
    },
    review: {
        type: Schema.Types.Mixed,
        required: false
    }
}, { _id: true});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;