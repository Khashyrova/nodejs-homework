const { Schema, model } = require("mongoose");
const Joi = require("joi");
const handleMongooseError = require("../helpers/handleMongooseError");
const emailRegexp = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minLength: 8,
    },
    token: {
      type: String,
      default: "",
    },

    // subscription: {
    //   type: String,
    //   enum: ["starter", "pro", "business"],
    //   default: "starter",
    // }
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);
const User = model("user", userSchema);

module.exports = {
  User,
};
