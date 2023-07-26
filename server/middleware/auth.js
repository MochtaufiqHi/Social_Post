import jwt from "jsonwebtoken";
import { User } from "../model/Model.js";

export const auth = async(req, res, next) => {
  try {
    let header = req.header("Authorization");

    if (!header) {
      return res.status(500).send({
        status: "failed",
        message: " Access Failed",
      });
    }

    const token = header.replace("Bearer ", "");
    const verifed = jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
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
      console.log(decoded);
      req.idUser = decoded.id;

      next();
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "failed",
      message: "Internal Server Error",
      location: "Middleware",
    });
  }
};