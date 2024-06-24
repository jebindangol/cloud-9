import dbConnect from "../../lib/dbConnect";
import Product from "../../model/Product";
import multer from "multer";
import path from "path";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const products = await Product.find({});
                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const payload = {
                    ...req.body,
                };
                const newProduct = new Product(payload);
                await newProduct.save();
                res.status(201).json({ success: true, data: newProduct });
            } catch (error) {
                console.error("post product error:", error);
                res.status(400).json({
                    success: false,
                    error: "Error adding product.",
                });
            }
            break;
        case "PUT":
            try {
                const payload = {
                    ...req.body,
                };

                // check if body has ID
                if (!req.body._id) {
                    res.status(400).json({ success: false, message: "Product ID Not found" });
                    return;
                }

                // find & edit product
                const editResponse = await Product.updateOne({ _id: req.body._id},{ $set: req.body})

                // check if there is any response
                if (editResponse.acknowledged) {
                    if (editResponse.matchedCount===0) { // check if any item with ID is found
                        res.status(404).json({ success: false, message: "Not found" });
                    } else if (editResponse.modifiedCount===0) { // check if anything is modified or not
                        res.status(200).json({ success: true, message: "No changes to Edit" });
                    } else {
                        res.status(200).json({ success: true, message: "Edit success" });
                    }
                } else { // incase of no response 
                    res.status(500).json({ success: false, message: "Failed to edit" });
                }
            } catch (error) {
                console.error("edit product error:", error);
                res.status(400).json({
                    success: false,
                    error: "Error editing product.",
                });
            }
            break;
        case "DELETE":
            try {
                const { id } = req.query;
                const response = await Product.deleteOne({ _id: id });
                if (response.deletedCount === 1) {
                    res.status(200).json({
                        success: true,
                        message: "Product deleted successfully.",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Product not found",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: "Error deleteting product",
                });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
