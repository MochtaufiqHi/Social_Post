import { User } from "../model/Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, photo } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt();
    const hasPassword = await bcrypt.hash(password, salt);

    await User.create({
      name: name,
      username: username,
      email: email,
      password: hasPassword,
      photo: req.files.picture[0].filename,
    });

    return res.status(201).json({
      success: true,
      message: "Your account has been succesfully created",
      data: { name, username, email, photo },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Interal Server Error", data: null });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ where: { username } });
    if (!checkUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const validPassword = await bcrypt.compare(password, checkUser.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password!" });
    }
    // console.log(email);
    // console.log(checkUser);
    const id = checkUser.id;
    const name = checkUser.name;
    const email = checkUser.email;

    const token = jwt.sign({ email, id, name, username }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      success: true,
      message: "Succesfully logged in",
      data: { token, name, id, username, email },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "No authentication token provided" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err.name);
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
          return res
            .status(401)
            .json({ message: "Invalid authentication token" });
        }
      }
      res
        .status(200)
        .json({ success: true, message: "Successfully logout", data: null });
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
    });
    // console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }
    res
      .status(200)
      .json({ success: true, message: "Successfuly Get User", data: user });
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { body } = req;

    console.log(body);
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found", data: null });
    };

    await User.update(body, {
      where: {
        id: userId,
      }
    });

    const updatedUser = await User.findOne({
      where: { id: userId },
      attributes: {
        exclude: ["password"],
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Successfuly Get User", data: updatedUser });
  } catch (error) {
    console.log("Error fetching user by ID:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const userId = req.params.id; 
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Old password is incorrect' });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New password and confirm password don't match" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Successfully Change Password' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Internal server error', data: null });
  }
};
