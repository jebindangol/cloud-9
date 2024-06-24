import dbConnect from "../../lib/dbConnect";
import Loyalty from "../../model/Loyalty";
import Shop from "../../model/Shop";
import User from "../../model/User";
import bcrypt from "bcrypt";

const validateEmail = (email) => {
  const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regEx.test(email);
};

const validateForm = async (email, password) => {
  if (!validateEmail(email)) {
    return { error: "Email is invalid" };
  }

  await dbConnect();
  const emailUser = await User.findOne({ email: email });

  if (emailUser) {
    return { error: "Email already exists" };
  }

  if (password.length < 5) {
    return { error: "Password must have 5 or more characters" };
  }

  return null;
};

export default async function handler(req, res) {
  // validate if it is a POST
  if (req.method !== "POST") {
    return res
      .status(200)
      .json({ error: "This API call only accepts POST methods" });
  }

  // get and validate body variables
  const {
    fullname,
    email,
    phone,
    dob,
    password,
    gender,
    role = "USER",
    createdStore ="createdStore"
  } = req.body;

  const errorMessage = await validateForm(email, password);
  if (errorMessage) {
    console.error(errorMessage);
    return res.status(400).json(errorMessage);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // TO DO: "ELITE CUSTIOMER is not a valid enum value for path role". Facing this error, have added elite customer as enum for user model as well.

  // create new User on MongoDB
  const newUser = new User({
    fullname,
    email,
    dob,
    phone,
    gender,
    role,
    createdStore,
    hashedPassword,
  });

  console.log(newUser,"new user is")

  const shop = await Shop.findOne({ shop_name: "Cloud 9"});
  newUser
    .save()
    .then(() => {
      const loyalty = new Loyalty({
        user_id: newUser._id,
        shop_id: shop._id
      });
      loyalty
        .save()
        .then(() => {
          res.status(200).json({
            msg: "Successfuly created new User: " + { newUser, loyalty },
          });
        })
        .catch((err) =>
          res.status(400).json({ error: "Error on '/api/register': " + err })
        );
    })
    .catch((err) =>
      res.status(400).json({ error: "Error on '/api/register': " + err })
    );
}
