import { User } from "../model/user.model.js";
import { ErrorFormat as Error } from "../Error.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, _, next) => {
  try {
    const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) throw new Error(401, "Unauthorized to make request");

    const fetchedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(fetchedToken?._id).select(
      "-password -refreshToken"
    );


    if(!user) throw new Error(401, "Invalid token.")

    req.user = user;
    next();
  } catch (error) {
    throw new Error(401, error?.message || "Invalid token");
  }
};

export { verifyToken };