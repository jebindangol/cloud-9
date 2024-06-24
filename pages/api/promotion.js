import dbConnect from "../../lib/dbConnect";
import Promotion from "../../model/Promotion";

export default async function handler(
    req,
    res
) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case 'GET':
            try {
                const shop = await Promotion.find()
                res.status(200).json({ success: true, data: shop })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const payload = {
                    ...req.body
                }
                const newPromotion = new Promotion(payload);

                await newPromotion.save();
                res.status(201).json({ success: true, data: newPromotion })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'DELETE':
            try {
                const {id } = req.query;
                const response = await Promotion.deleteOne({_id: id});
                if (response.deletedCount === 1) {
                    res.status(200).json({
                        success: true,
                        message: "Promotion deleted successfully.",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        message: "Promotion not found",
                    });
                }
            } catch (error) {
                res.status(400).json({
                    success: false,
                    error: "Error deleteting Promotion",
                });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break
    }

}