const User = require("../models/User");

// Get Profile
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user.userId
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Update Profile
exports.updateProfile = async (req, res) => {

  try {

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};