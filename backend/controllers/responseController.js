import Response from "../models/Response.js";
import Form from "../models/Form.js";

// Submit form response
export const submitResponse = async (req, res) => {
  try {
    const { formId, userId, userName, answers } = req.body;

    console.log("Received payload:", { formId, userId, userName, answers });

    if (!formId || !userId || !userName || !answers) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: formId, userId, userName, answers",
      });
    }

    // Verify form exists
    const form = await Form.findById(formId);
    if (!form) {
      console.log("Form not found with ID:", formId);
      return res.status(404).json({
        success: false,
        message: `Form not found with ID: ${formId}`,
      });
    }

    // Process uploaded files
    const files = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        // Extract fieldId from fieldname (format: fieldId_label)
        const parts = file.fieldname.split("_");
        const fieldId = parseInt(parts[0], 10);
        const fieldLabel = parts.slice(1).join("_"); // In case label has underscores

        files.push({
          fieldId: isNaN(fieldId) ? 0 : fieldId,
          fieldLabel: fieldLabel || file.fieldname,
          fileName: file.filename,
          filePath: file.path,
          originalFileName: file.originalname,
          fileSize: file.size,
          mimeType: file.mimetype,
          uploadedAt: new Date(),
        });
      });
    }

    const newResponse = new Response({
      formId,
      userId,
      userName,
      answers,
      files,
    });

    await newResponse.save();

    res.status(201).json({
      success: true,
      message: "Response submitted successfully",
      response: newResponse,
    });
  } catch (error) {
    console.error("Error submitting response:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

// Get all responses for a form
export const getFormResponses = async (req, res) => {
  try {
    const { formId } = req.params;
    const adminId = req.admin.id;

    // Verify admin owns the form
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    if (form.adminId.toString() !== adminId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const responses = await Response.find({ formId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      responses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get response count for a form
export const getResponseCount = async (req, res) => {
  try {
    const { formId } = req.params;

    const count = await Response.countDocuments({ formId });

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single response
export const getSingleResponse = async (req, res) => {
  try {
    const { responseId } = req.params;

    const response = await Response.findById(responseId);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Response not found",
      });
    }

    res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
