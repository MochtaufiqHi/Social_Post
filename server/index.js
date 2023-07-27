import express from 'express';
import db from './config/Database.js';
import { User, Post, UserLiked } from './model/Model.js';
import cors from 'cors';
import router from './routes/index.js';
import dotenv from  "dotenv";
import bodyParser from 'body-parser';
const app = express();
const port = 5000;

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use("/uploads", express.static("public"));
app.use("/api/v1",router);

try {
  await db.authenticate();
  await User.sync();
  await Post.sync();
  await UserLiked.sync();
  console.log("Success Connent to Database")
} catch (error) {
  console.log(error)
}

app.listen(port, () => {
  console.log(`Server Runing on port ${port}`);
});
