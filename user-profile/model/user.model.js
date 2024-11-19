import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      length: [2, "Name can't be lesser than 2 characters"],
    },
    email: {
      type: String,
      // unique:true,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    education: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
      {
          _id: this._id,
          email: this.email,
          user: this.user,
          name: this.name,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXP,
      },
  );
};
userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
      {
          _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXP,
      },
  );
};

export const User = mongoose.model("User", userSchema);
