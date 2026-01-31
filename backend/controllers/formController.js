import Form from "../models/Form.js";

// Create new form
export const createForm = async (req, res) => {
  try {
    const { title, fields } = req.body;
    const adminId = req.admin.id;

    if (!title || !fields) {
      return res.status(400).json({
        success: false,
        message: "Title and fields are required",
      });
    }

    const newForm = new Form({
      adminId,
      title,
      fields,
    });

    await newForm.save();

    res.status(201).json({
      success: true,
      message: "Form created successfully",
      form: newForm,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all forms for admin
export const getAllForms = async (req, res) => {
  try {
    const adminId = req.admin.id;

    const forms = await Form.find({ adminId, isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all available forms for users (public)
export const getAllAvailableForms = async (req, res) => {
  try {
    const forms = await Form.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      forms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single form by ID
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    res.status(200).json({
      success: true,
      form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update form
export const updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, fields } = req.body;
    const adminId = req.admin.id;

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Check if admin owns the form
    if (form.adminId.toString() !== adminId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (title) form.title = title;
    if (fields) form.fields = fields;

    await form.save();

    res.status(200).json({
      success: true,
      message: "Form updated successfully",
      form,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete form
export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.admin.id;

    const form = await Form.findById(id);

    if (!form) {
      return res.status(404).json({
        success: false,
        message: "Form not found",
      });
    }

    // Check if admin owns the form
    if (form.adminId.toString() !== adminId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Soft delete
    form.isActive = false;
    await form.save();

    res.status(200).json({
      success: true,
      message: "Form deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
