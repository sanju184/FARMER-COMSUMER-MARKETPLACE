const User = require("../models/User");

const getPendingFarmers = async (req, res) => {
  try {
    const pendingFarmers = await User.find({
      isVerified: false,
      role: "farmer",
    });
    res.json(pendingFarmers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching farmers" });
  }
};

const approveFarmer = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );
    res.json({ message: "Farmer approved" });
  } catch (error) {
    res.status(500).json({ message: "Error approving farmer" });
  }
};

const rejectFarmer = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Farmer rejected" });
  } catch (error) {
    res.status(500).json({ message: "Error rejecting farmer" });
  }
};

module.exports = {
  getPendingFarmers,
  approveFarmer,
  rejectFarmer,
};
