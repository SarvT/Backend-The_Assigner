import { Schema, model } from "mongoose";

const candidateSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
    },
    resume:{
        type:String,
        // required:[true, "Resume can't be empty."]
    }
  },
  { timestamps: true }
);

export const Candidate = model("Candidate", candidateSchema);
