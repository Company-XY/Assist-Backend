const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["Client", "Freelancer"],
      required: [true, "Choose Your Role"],
    },
    type: {
      type: String,
      enum: ["Individual", "Business"],
      required: [true, "Select the type"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      minLength: 150,
    },
    name: {
      type: String,
      required: true,
      unique: [true, "Name has to be unique"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already in use"],
    },
    approved: {
      type: Boolean,
      default: false,
    },
    consultation: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    phone_verified: {
      type: Boolean,
      default: false,
    },
    account_balance: {
      type: Number,
      default: 0,
    },
    avatar: {
      title: String,
      fileUrl: String,
    },
    location: {
      type: String,
    },
    experience: {
      type: [String],
    },
    skills: {
      type: [String],
    },
    schedule: {
      type: String,
    },
    tasks: {
      type: [String],
    },
    hours: {
      type: String,
    },
    portfolio: {
      type: String,
    },
    //sample_work changed to files
    files: [
      {
        title: String,
        fileUrl: String,
      },
    ],
    payment_method: {
      type: String,
    },
    payment_rate: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
