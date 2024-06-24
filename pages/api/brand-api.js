import dbConnect from "../../lib/dbConnect";
import Brand from "../../model/Brand";

export default async function handler(
    req,
    res
) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const brands = await Brand.find({})
                res.status(200).json({ success: true, data: brands })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const { _id, label, url, key } = req.body;
                
                const newBrand = new Brand({
                    _id,
                    label,
                    url,
                    key
                });
                await newBrand.save();
                res.status(201).json({ success: true, data: newBrand })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'DELETE':
            try {
                const {id } = req.query;
                const response = await Brand.deleteOne({_id: id});
                if (response.deletedCount === 1) {
                    res.status(200).json({
                        success: true,
                        message: "Brand deleted successfully.",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Brand not found",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: "Error deleteting Brand",
                });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }

}