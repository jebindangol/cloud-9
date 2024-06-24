import dbConnect from "../../lib/dbConnect";
import Category from "../../model/Category";

export default async function handler(
    req,
    res
) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const categories = await Category.find({})
                res.status(200).json({ success: true, data: categories })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const { _id, label, url, key, sub_categories } = req.body;
                const newCategory = new Category({
                    _id,
                    label,
                    url,
                    key,
                    sub_categories
                });
                await newCategory.save();
                res.status(201).json({ success: true, data: newCategory })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const {id } = req.query;
                const response = await Category.deleteOne({_id: id});
                if (response.deletedCount === 1) {
                    res.status(200).json({
                        success: true,
                        message: "Category deleted successfully.",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Category not found",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: "Error deleteting Category",
                });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }

}