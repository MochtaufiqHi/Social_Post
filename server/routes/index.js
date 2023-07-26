import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserByID,
  updateUser,
  changePassword,
} from "../controllers/User.js";
import {
  allPosts,
  createPost,
  deletePost,
  getAllPost2,
  getPostById,
  getPostByUserId,
  likePost,
  unlikePost,
  updatePost,
  uploadImage,
} from "../controllers/Post.js";
import { auth } from "../middleware/auth.js";
import { uploadFile } from "../middleware/uploadFiles.js";

const router = express.Router();

router.post("/auth/register", uploadFile('picture', null, 'picture'), registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/logout", logoutUser);
router.get("/user/:id", getUserByID);
router.put("/user/:id", auth, updateUser);
router.put("/user/change-password/:id", auth, changePassword);

router.post("/post", auth, createPost);
router.put("/post/:id", auth, updatePost);
router.delete("/post/:id", auth, deletePost);
router.put("/post/like/:id", auth, likePost);
router.put("/post/unlike/:id", auth, unlikePost);

router.get("/post", auth, allPosts);
router.get("/post2", auth, getAllPost2);
router.get("/post/:id", auth, getPostById);
router.get("/post/user/:id", auth, getPostByUserId);

router.post("/file", uploadFile("image", "attachment", "picture"), uploadImage)

export default router;
