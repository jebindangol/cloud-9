import dbConnect from "../../../lib/dbConnect";
import Loyalty from "../../../model/Loyalty";
import User from "../../../model/User";

export default async function handler(req, res) {
  const {
    method,
    body,
    query: { id },
  } = req;
  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const split = id.split("&dob=");
        let user = "";
        if (split[1]) {
          function formatDate(dateStr) {
            var dateParts = dateStr.split("-");
            var formattedDate = dateParts[1] + "/" + dateParts[2] + "/" + dateParts[0];
            return formattedDate;
          }
          user = await User.findOne({
            phone: split[0],
            dob: formatDate(split[1]),
          });
        } else {
          user = await User.findOne({ phone: id });
        }
        if (!user) {
          res.status(404).json({ success: false, msg: "Phone doesn't exists" });
          return;
        }
        const loyalty = await Loyalty.findOne({ user_id: user._id }).sort({
          _id: -1,
        });
        res.status(200).json({ success: true, data: { user, loyalty } });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.msg });
      }
      break;

    // case "PATCH":
    //   try {
    //     const user = await User.findByIdAndUpdate(
    //       id,
    //       {
    //         loyalty: body.loyalty,
    //       },
    //       { new: true }
    //     );

    //     if (!user) {
    //       res.status(404).json({ success: false, msg: "Phone doesn't exists" });
    //     }

    //     res.status(200).json({ success: true, data: user });
    //   } catch (error) {
    //     console.log(error);
    //     res.status(400).json({ success: false, msg: error.msg });
    //   }
    //   break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
