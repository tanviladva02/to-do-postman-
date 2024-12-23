"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.getUser = exports.user = void 0;
const user_service_1 = require("../services/user.service");
const user = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { userId } = req.params;
        const { username, email, pass } = req.body;
        const userDetail = yield (0, user_service_1.addUser)(username, email, pass);
        return res.status(200).json({ msg: "User added successfully!", userDetail });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.user = user;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, user_service_1.viewUser)(); // Fetch all users
        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        return res.status(200).json({ msg: "Users fetched successfully!", data: users });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.getUser = getUser;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params; // User ID from route
        const { username, email, pass } = req.body; // New user data
        const updatedUser = yield (0, user_service_1.updateUser)(userId, { username, email, pass });
        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        return res.status(200).json({ msg: "User updated successfully!", data: updatedUser });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.updateUserDetails = updateUserDetails;
