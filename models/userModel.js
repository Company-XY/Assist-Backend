const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    role: {
      type: String, // String with allowed values "Client" or "Freelancer"
      enum: ["Client", "Freelancer"],
      required: [true, "Choose Your Role"],
    },
    type: {
      type: String, // String with allowed values "Individual" or "Business"
      enum: ["Individual", "Business"],
      required: [true, "Select the type"],
    },
    name: {
      type: String, // String
      required: true,
      unique: [true, "Name has to be unique"],
    },
    email: {
      type: String, // String
      required: true,
      unique: [true, "Email already in use"],
    },
    approved: {
      type: Boolean, // Boolean
      default: false,
    },
    consultation: {
      type: Boolean, // Boolean
      default: false,
    },
    password: {
      type: String, // String
      required: true,
    },
    phone: {
      type: Number, // Number
      unique: true,
    },
    account_balance: {
      type: Number, // Number
      default: 0,
    },
    avatar: {
      type: String, // String
    },
    location: {
      type: String, // String
    },
    experience: {
      type: [Number], // Array of Numbers
    },
    skills: {
      type: [String], // Array of Strings
    },
    schedule: {
      type: String, // String
    },
    tasks: {
      type: [String], // Array of Strings
    },
    hours: {
      type: String, // String
    },
    portfolio: {
      type: String, // String
    },
    sample_work: [
      {
        title: String, // String
        fileUrl: String, // String
      },
    ],
    payment_method: {
      type: String, // String
    },
    payment_rate: {
      type: String, // String
    },
    resetToken: {
      type: String, // String
    },
    resetTokenExpiration: {
      type: Date, // Date
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
