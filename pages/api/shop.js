import dbConnect from "../../lib/dbConnect";
import Shop from "../../model/Shop";

export default async function handler(req, res) {
    const { method } = req;
    await dbConnect();
    switch (method) {
        case "GET":
            try {
                const shop = await Shop.find();
                res.status(200).json({ success: true, data: shop });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const payload = {
                    ...req.body,
                };
                const newShop = new Shop(payload);

                await newShop.save();
                res.status(201).json({ success: true, data: newShop });
            } catch (error) {
                console.error("post shop error: ", error);
                res.status(400).json({ success: false });
            }

            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
