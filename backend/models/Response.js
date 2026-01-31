import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fieldId: Number,
    fieldLabel: String,
    fileName: String,
    filePath: String,
    originalFileName: String,
    fileSize: Number,
    mimeType: String,
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const responseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    answers: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    files: {
      type: [fileSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Response", responseSchema);
