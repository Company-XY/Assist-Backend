const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const upload = require("../middlewares/fileUpload");

//@desc Register a new user
//@route POST .../api/v1/register
//@access PUBLIC
//Default register Freelancer function

const registerFreelancer = asyncHandler(async (req, res) => {
  const role = "Freelancer";
  const { type, email, name, password, consultation } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Password validation using regular expression
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
      });
    }

    const user = await User.create({
      role,
      type,
      name,
      email,
      password,
      consultation,
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        role: user.role,
        type: user.type,
        name: user.name,
        email: user.email,
        consultation: user.consultation,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//@desc Auth user and get token
//@route POST ../api/v1/login
//@access Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);

    res.json({
      _id: user.id,
      role: user.role,
      token: token,
      name: user.name,
      email: user.email,
      Balance: user.account_balance,
      approved: user.approved,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//Client register function

const registerClient = asyncHandler(async (req, res) => {
  const role = "Client";
  const { type, email, name, password, consultation } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Password validation using regular expression
    const passwordPattern =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one letter, one number, and one special character.",
      });
    }

    const user = await User.create({
      role,
      type,
      name,
      email,
      password,
      consultation,
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        role: user.role,
        type: user.type,
        name: user.name,
        email: user.email,
        consultation: user.consultation,
        token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid user data" });
  }
});

//@desc Logout user
//@acesss Private, only when logged in

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfully" });
};

//@desc get User profile
//@Route ../api/v1/profile/:id
//@Access private
//Function to get a single user's profile, to be 'GET' at the dashboard/profile of the user

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  if (user) {
    res.json({
      _id: user._id,
      role: user.role,
      type: user.type,
      name: user.name,
      email: user.email,
      phone: user.phone,
      Account_Balance: user.account_balance,
      location: user.location,
      avatar: user.avatar,
      experience: user.experience,
      skills: user.skills,
      schedule: user.schedule,
      tasks: user.tasks,
      hours: user.hours,
      portfolio: user.portfolio,
      sample_work: user.sample_work,
      payment_method: user.payment_method,
      payment_rate: user.payment_rate,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc update user profile
//@route ../api/v1/profile/:id
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body; // Get all the fields from the request body

    // Use the `findByIdAndUpdate` method to update the user's document
    // The { new: true } option returns the updated document
    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!user) {
      // Handle the case where the user is not found
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = { updateUserProfile };

//One users views another user's profile
//GET Request only
const getAnotherProfile = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userProfile = await findById(id);
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(404).json("User Not Found, check ID");
  }
});

////////////////////MISCALLANEOUS//////////////////////

//homepage
//@desc test api up and running
//@route ../api/v1
//@access public

const home = (req, res) => {
  try {
    res.status(200).json("Server status is good");
  } catch (error) {
    res.status(400);
    console.log({ message: error.message });
  }
};

//get all user
//@route ../api/v1/public/secured/users
//@access public... but secured

const getAll = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log({ message: error.message });
  }
};

////////////////////////EXPORTS//////////////////////////

module.exports = {
  home,
  getAll,
  authUser,
  registerClient,
  registerFreelancer,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAnotherProfile,
};
