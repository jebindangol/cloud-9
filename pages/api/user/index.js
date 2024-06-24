import dbConnect from "../../../lib/dbConnect";
import Loyalty from "../../../model/Loyalty";
import User from "../../../model/User";
import bcrypt from "bcrypt";

const validateEmail = (email) => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (email, password, phone) => {
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });

  const phoneUser = await User.findOne({ phone: phone });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (phoneUser) {
    return { error: "Phone already exists" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

  return null;
};

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        const users = await User.find({});
     
        let userData = [];

        for (const item of users) {
          const loyalty = await Loyalty.findOne({ user_id: item._id }).sort({
            _id: -1,
          });
          const userDataItem = {
            ...item.toObject(),
            loyalty: loyalty?.total_loyalty_point,
          };

          userData.push(userDataItem);
        }

        res.status(200).json({ success: true, data: userData });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const { fullname, email, phone, dob, password } = req.body;

        const errorMessage = await validateForm(email, password, phone);
        if (errorMessage) {
          console.error(errorMessage);
          return res.status(400).json(errorMessage);
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
          fullname,
          email,
          dob,
          phone,
          hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
