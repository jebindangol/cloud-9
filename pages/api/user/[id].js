import dbConnect from "../../../lib/dbConnect";
import User from "../../../model/User";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";
import { verifyUser } from "../middleware/requiredAuth";

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
        const user = await User.findById(id);

        if (!user) {
          res.status(404).json({ success: false, msg: "User doesn't exists" });
        }
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, msg: error.msg });
      }
      break;
    case "PATCH":
      try {
        await verifyUser(req, res, "both");

        const user = await User.findOne({ phone: body.phone });

        if (user && user._id != id) {
          res
            .status(400)
            .json({ success: false, msg: "Phone number already exists" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, body, {
          new: true,
          runValidator: true,
        });
        if (!updatedUser) {
          res.status(404).json({ success: false, msg: "User doesn't exists" });
        }
        res.status(200).json({ success: true, data: updatedUser });
      } catch (error) {
        res.status(400).json({ success: false, msg: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
