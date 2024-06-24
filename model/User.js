import { Int32 } from "mongodb";
import mongoose from "mongoose";
import { number } from "yup";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  createdStore: {
    type: String,
    enum: ["Cloud9", "Hemphys"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    minlength: 5,
  },
  role: {
    type: String,
    enum: ["SUPERADMIN", "ADMIN", "USER", "ELITE"],
    default: "USER",
    required: true,
  },

  active: {
    type: Boolean,
    default: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    // required: true,
  },

  profile: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    tagLine: {
      type: String,
    },
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
