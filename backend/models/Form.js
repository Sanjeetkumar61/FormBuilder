import mongoose from "mongoose";

// Field schema for form fields
const fieldSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "text",
        "email",
        "number",
        "textarea",
        "checkbox",
        "checkbox-group",
        "radio",
        "dropdown",
        "file",
      ],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    acceptedFileTypes: {
      type: [String],
      default: [],
    },
    maxFileSize: {
      type: Number,
      default: 5242880,
    },
    options: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const formSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    fields: [fieldSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Form", formSchema);
