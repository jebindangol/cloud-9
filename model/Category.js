import mongoose from "mongoose";
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    key: {
        type: String,
        required: true,
        unique: true,
    },
    label: {
        type: String,
        requeired: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    sub_categories: { type: Array, "default": [] }
});

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;