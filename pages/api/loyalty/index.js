import dbConnect from "../../../lib/dbConnect";
import Loyalty from "../../../model/Loyalty";
import LoyaltyRate from "../../../model/LoyaltyRate";
import User from "../../../model/User";
import { verifyUser } from "../middleware/requiredAuth";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        await verifyUser(req, res, "both");
        const loyalty = await LoyaltyRate.findOne();
        if (!loyalty) {
          res
            .status(404)
            .json({ success: false, msg: "Loyalty doesn't exists" });
        }
        res.status(200).json({ success: true, data: loyalty });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.msg });
      }
      break;
    case "POST":
      try {
        await verifyUser(req, res, "both");
        const loyalty = new Loyalty({
          user_id: body.loyalty.user_id,
          shop_id: body.loyalty.shop_id,
          total_loyalty_point: body.loyalty.loyalty,
          loyalty_earn: body.loyalty.loyalty_earn,
          redeem_amount: body.loyalty.redeem_amount,
          created_by: body.loyalty.user.id,
        });
        loyalty.save();

        const user = await User.findById(body.loyalty.user_id);
        res.status(200).json({ success: true, data: { user, loyalty } });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: error.msg });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
