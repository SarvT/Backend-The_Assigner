import { User } from "../model/user.model.js";
import { uploadOnCloud } from "../cloudinary.js";

const createUser = async (req, res) => {
  const { name, email, phone, education, location } = req.body;

  // Check for missing required fields
  if (!name || !email || !phone || !education || !location) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  // Check for avatar file
  const avatarFilePath = req.file?.path;
  if (!avatarFilePath) {
    return res.status(400).json({
      success: false,
      message: "Profile picture is required.",
    });
  }

  // upload image file on cloud
  const avatarImg = await uploadOnCloud(avatarFilePath);

  // Create a new user
  try {
    const newUser = await User.create({
      name,
      email,
      phone,
      education,
      // if url is invalid then add blank
      avatar: avatarImg?.url || "",
      location,
    });

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "There was an issue while signing up the user.",
      });
    }

    // save the db
    newUser.save({ validateBeforeSave: false });

    // Send a success response
    return res.status(200).json({
      success: true,
      message: "User successfully signed up.",
      data: { newUser },
    });
  } catch (error) {
    // Catch any error during user creation
    return res.status(500).json({
      success: false,
      message: "Error creating user.",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    // finds all the users
    const users = await User.find();

    return res.status(200).json({
      scucess: true,
      message: "Users list is found",
      data: {
        users: users,
      },
    });
  } catch (error) {
    return res.status(500).json({
      scucess: false,
      message: "An error occurred while fetching users",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  // get email of user
  const { email } = req.body;

  // check for email is there
  if (!email)
    return res.send(400).json({
      scucess: false,
      message: "email is required.",
    });

  try {
    // finds user from db
    const user = await User.find({ email });

    // check for user is there
    if (!user)
      return res.send(400).json({
        scucess: false,
        message: "user not found.",
      });

    return res.status(200).json({
      scucess: true,
      message: "User fetched successfully.",
      data: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      scucess: false,
      message: "An error occurred while fetching the user",
      error: error.message,
    });
  }
};

export { createUser, getUsers, getUser };
