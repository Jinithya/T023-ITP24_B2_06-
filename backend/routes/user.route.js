import express from "express";
import { getAllUsers, updateUser,deleteUser } from "../controllers/user.controllers.js";
import {verifyToken} from "../utils/verifyToken.js";
const router = express.Router();

router.get('/users', getAllUsers);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
export default router;