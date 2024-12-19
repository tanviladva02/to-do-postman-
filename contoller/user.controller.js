const { addUser, viewUser , updateUser  } = require("../services/user.service");

const user = async (req, res) => {
  try {
    console.log(req.body);
    const { userId } = req.params;
    const { username, email, pass } = req.body;
    const userDetail = await addUser(username, email, pass);
    return res.status(200).json({ msg: "User added successfully!", userDetail });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const users = await viewUser(); // Fetch all users
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    return res.status(200).json({ msg: "Users fetched successfully!", data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const updateUserDetails = async (req, res) => {
    try {
      const { userId } = req.params; // User ID from route
      const { username, email, pass } = req.body; // New user data
  
      const updatedUser = await updateUser(userId, { username, email, pass });
      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      return res.status(200).json({ msg: "User updated successfully!", data: updatedUser });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

module.exports = {
  user,
  getUser,
  updateUserDetails
};
