import { ErrorFormat as Error } from "../Error.js";
import { Response } from "../Response.js";
import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessnRefreshToken = async (userId) => {
  try {
    const currUser = await User.findById(userId);
    const accTkn = currUser.generateAccessToken();
    const rfrTkn = currUser.generateRefreshToken();

    currUser.refreshToken = rfrTkn;
    await currUser.save({ validateBeforeSave: false });

    return { accTkn, rfrTkn };
  } catch (error) {
    new Error(500, " Something went wrong, token can't be generated.");
  }
};

const register = async (req, res) => {
  const { user, email, name, password } = req.body;
  if ([name, user, email, password].some((val) => val?.trim() === "")) {
    new Error(400, "All field are required.");
  }

  const userExist = await User.findOne({ $or: [{ email }, { user }] });
  if (userExist) {
    new Error(409, "User already exist.");
  }
  const newUser = await User.create({
    name: name,
    email: email,
    user: user.toLowerCase(),
    password,
  });

  const userCreated = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );
  if (!userCreated) {
    new Error(500, "User not created");
  }

  return res
    .status(201)
    .json(new Response(200, userCreated, "user registered successfully."));
};

const login = async (req, res) => {
  try {
    const { email, user, password } = req.body;

    // Validate input
    if (!email && !user) {
      return res.status(400).json({ message: "Username or email is empty." });
    }

    // Find user by email or username
    const currUser = await User.findOne({ $or: [{ email }, { user }] });
    if (!currUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // Validate password
    const isPasswordValid = await currUser.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate tokens
    const { accTkn, rfrTkn } = await generateAccessnRefreshToken(currUser._id);

    // Get user session data
    const userSession = await User.findById(currUser._id).select(
      "-password -refreshToken"
    );

    // Cookie options
    const options = {
      httpOnly: true,
      secure: true, // Set this to true for HTTPS
    };

    // Set cookies and send response
    console.log(rfrTkn);
    console.log(accTkn);
    return res
      .cookie("refreshToken", rfrTkn, options)
      .cookie("accessToken", accTkn, options)
      .status(200)
      .json({ user: userSession, accTkn, rfrTkn });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new Response(200, {}, "User's session is over."));
};

const refreshAccToken = async (req, res) => {
  const inputRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!inputRefreshToken) throw new Error(401, "Unauthorized request");

  try {
    const extractedToken = jwt.verify(
      inputRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(extractedToken?._id);
    if (!user) throw new Error(401, "Unauthorized token");

    if (inputRefreshToken !== user?.refreshToken)
      throw new Error(401, "Refresh token is expired");

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accTkn, newRfrTkn } = await generateAccessnRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accTkn)
      .cookie("refreshToken", newRfrTkn)
      .json(
        new Response(
          200,
          { accTkn, refreshToken: newRfrTkn },
          "Access token is generated."
        )
      );
  } catch (error) {
    throw new Error(401, error?.message || "Invalid refresh token");
  }
};

const changeUserPassword = async (req, res) => {
  const { currPass, newPass } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(currPass);

  if (!isPasswordCorrect) throw new Error(400, "incorrect current password.");

  user.password = newPass;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new Response(200, {}, "password changed successfully."));
};

const getCurrUser = async (req, res) => {
  return res.status(200).json(new Response(200, req.user, "current user"));
};

const updateUserDetails = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) throw new Error(400, "all fields are required");

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        name,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new Response(200, user, "User details updated successfully!"));
};

export {
  register,
  login,
  logoutUser,
  refreshAccToken,
  changeUserPassword,
  getCurrUser,
  updateUserDetails,
};
