var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addUser, viewUser, updateUser } from "../services/user.service.js";
export const user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, pass } = req.body;
        const userDetail = yield addUser(username, email, pass);
        res.status(201).json({ msg: "User added successfully!", userDetail });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
export const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield viewUser();
        if (!users || users.length === 0) {
            res.status(404).json({ msg: "No users found" });
            return;
        }
        res.status(200).json({ msg: "Users fetched successfully!", data: users });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
export const updateUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params; // User ID from route
        const { username, email, pass } = req.body; // New user data
        const updatedUser = yield updateUser(userId, { username, email, pass });
        if (!updatedUser) {
            res.status(404).json({ msg: "User not found" });
            return;
        }
        res.status(200).json({ msg: "User updated successfully!", data: updatedUser });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});
