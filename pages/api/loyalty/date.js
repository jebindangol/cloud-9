import dbConnect from "../../../lib/dbConnect";
import Loyalty from "../../../model/Loyalty";
import LoyaltyRate from "../../../model/LoyaltyRate";
import User from "../../../model/User";
import Shop from "../../../model/Shop";
import { verifyUser } from "../middleware/requiredAuth";

export default async function handler(req, res) {
  const { method, body } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const user = await verifyUser(req, res, "both");

        const startOfDay = req.query.startDate + "T00:00:00.000Z";
        const endOfDay = req.query.endDate + "T23:59:59.000Z";

        let query = {
          createdAt: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        };

        if (user?.role === "SUPERADMIN" || user?.role === "ADMIN") {
          query = {
            ...query,
          };
        } else {
          query = {
            ...query,
            created_by: user._id,
          };
        }

        const loyalty = await Loyalty.find(query).sort({ createdAt: -1 });
        if (!loyalty) {
          res
            .status(404)
            .json({ success: false, msg: "Loyalty doesn't exists" });
        }
        let loyaltyData = [];

        function formatDate(dateStr) {
          const loyaltyDate = new Date(dateStr);
          const localDate = loyaltyDate.toLocaleString();
          return localDate;
        }

        await Promise.all(
          loyalty.map(async (loyalty) => {
            const user = await User.findById(loyalty?.user_id);
            const created = await User.findById(loyalty?.created_by);
            const shop = await Shop.findById(loyalty?.shop_id);

            loyaltyData.push({
              ...loyalty.toObject(),
              shop: shop,
              createdAt: formatDate(loyalty?.createdAt),
              createdBy: created?.fullname,
              userName: user?.fullname,
              userPhone: user?.phone,
            });
          })
        ).catch( err => console.error("error: ", err));

        const totalReedemAmt = loyaltyData.reduce(
          (acc, curr) => acc + curr?.redeem_amount,
          0
        );

        const totalLoyaltyPoint = loyaltyData.reduce(
          (acc, curr) => acc + curr?.loyalty_earn,
          0
        );

        const totalUserReedem = await loyaltyData.filter(
          (item) => item?.redeem_amount > 0
        );

        res.status(200).json({
          success: true,
          data: {
            loyaltyData,
            summary: {
              totalReedemAmt,
              totalUserReedem: totalUserReedem.length,
              totalLoyaltyPoint,
            },
          },
        });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.msg });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
