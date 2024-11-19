import { User } from "../model/user.model.js";
import { APIResponse } from "../APIResponse.js";
import { APIError } from "../APIError.js";

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
    const avatarFilePath = req.files?.avatar?.[0]?.path;
    console.log(avatarFilePath);
    if (!avatarFilePath) {
        return res.status(400).json({
            success: false,
            message: "Profile picture is required.",
        });
    }
  
    // Create a new user
    try {
      const newUser = await User.create({
        name,
        email,
        phone,
        education,
        avatar: avatarFilePath,
        location,
      });
  
      if (!newUser) {
        return res.status(400).json({
          success: false,
          message: "There was an issue while signing up the user.",
        });
      }
  
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
  const { id } = req.params;
  if (!id)
    return res.send(400).json({
      scucess: false,
      message: "all the fields are required.",
    });

  try {
    const user = await User.findById(id);
    if (!id)
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
