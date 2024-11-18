const User = require("../models/userModel");
const mongoose = require("mongoose")
// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })
    res.status(200).json(users)
  }
  catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  try {
    const newUser = await User.create({ ...req.body });
    res.status(201).json(newUser);
  }
  catch (error) {
    res.status(400).json({ message: "Failed to create user" })
  }

};

// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(404).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findOne({_id: userId});

    if(!user){
      throw new error
    }
    
    res.status(200).json(user)
  }
  catch (error) {
    res.status(404).json({ message: "User not found" })
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updatedUser = await User.findOneAndReplace(
      { _id: userId },
      { ...req.body },
      { new: true }
    )
    res.status(200).json(updatedUser);
  }

  catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    await User.findOneAndDelete(
      { _id: userId }
    );
    res.status(204).send();
  }
  catch (error) {
    res.status(404).json({ message: "User not found" })
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
