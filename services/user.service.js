const user = require("../model/model.user");
const bcrypt = require("bcrypt");

// Function to hash the password
async function hashPassword(plainPassword) {
    try {
      const saltRounds = 10; // Number of salt rounds
      const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      return hashedPassword;
    } catch (err) {
      console.error("Error hashing password:", err);
      throw err;
    }
  }
  

  async function addUser(username, email, plainPassword) {
    try {
      const hashedPassword = await hashPassword(plainPassword); // Hash the password
      const newUser = new user({
        username,
        email,
        pass: hashedPassword, // Store the hashed password
      });
      await newUser.save();
      return newUser;
    } catch (err) {
      throw new Error(`User creation failed: ${err.message}`);
    }
  }

async function viewUser() {
  try {
    const users = await user.find(); // Fetch all users
    return users;
  } catch (err) {
    throw new Error(`User fetch failed: ${err.message}`);
  }
}

async function updateUser(userId, userData) {
    try {
      const updatedUser = await user.findByIdAndUpdate(
        userId,
        { $set: userData }, // Update only provided fields
        { new: true } // Return the updated document
      );
      return updatedUser;
    } catch (err) {
      throw new Error(`User update failed: ${err.message}`);
    }
}
  

module.exports = {
  addUser,
  viewUser,
  updateUser,
};
