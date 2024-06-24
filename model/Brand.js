import mongoose from "mongoose";
const Schema = mongoose.Schema;
const brandSchema = new Schema({
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
    }
});
const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;