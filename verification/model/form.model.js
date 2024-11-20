import mongoose, { Schema } from "mongoose";

const formSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone number is required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    services: {
      type: [String],
      enum: [
        "ui/web design",
        "web development",
        "content writing",
        "research and analysis",
        "photo editing",
        "video editing",
        "consultancy services",
        "technical support services",
        "graphic design",
        "digital marketing",
      ],
      required: [true, "At least one service is required"],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0; // Ensure at least one service
        },
        message: "You must select at least one service",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware for lowercase transformation
formSchema.pre("save", function (next) {
  if (this.services && Array.isArray(this.services)) {
    this.services = this.services.map((service) => service.toLowerCase());
  }
  next();
});

export const Form = mongoose.model("Form", formSchema);
