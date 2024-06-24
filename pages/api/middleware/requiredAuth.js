import jwt from "jsonwebtoken";
import User from "../../../model/User";

export const verifyUser = (req, res, userType = "all") => {
  return new Promise((resolve, reject) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return reject({ status: 401, error: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.NEXTAUTH_JWT_SECRET, async (err, payload) => {
      if (err) {
        return reject({ status: 401, error: "Unauthorized" });
      }

      const user = await User.findById(payload);

      if (
        userType === "both" &&
        (user.role === "SUPERADMIN" || user.role === "ADMIN")
      ) {
        resolve(user);
      } else {
        reject({ status: 403, error: "Forbidden" });
      }
    });
  });
};
