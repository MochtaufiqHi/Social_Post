// import { DataTypes } from "sequelize";
// import db from '../config/Database.js';
// import User from './User.js';

// const Post = db.define('post', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//   },
//   caption: {
//     type: DataTypes.STRING,
//   },
//   tags: {
//     type: DataTypes.STRING,
//   },
//   likes: {
//     type: DataTypes.INTEGER,
//   },
//   image: {
//     type: DataTypes.STRING,
//   },
//   createdAt: {
//     type: DataTypes.DATE,
//   },
//   updatedAt: {
//     type: DataTypes.DATE,
//   },
// });

// User.belongsToMany(Post, { through: UserLiked, as: 'likedPosts', foreignKey: 'userId' });
// Post.belongsToMany(User, { through: UserLiked, as: 'likingUsers', foreignKey: 'postId' });

// export default Post;