// // models/UserLiked.js
// import { DataTypes } from 'sequelize';
// import db from '../config/Database.js';
// import Post from './Post.js';
// import User from './User.js';

// const UserLiked = db.define('UserLiked', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   userId: {
//     type: DataTypes.INTEGER,
//   },
//   postId: {
//     type: DataTypes.INTEGER,
//   },
// });

// // User.belongsToMany(Post, { through: UserLiked, as: 'likedPosts', foreignKey: 'userId' });
// // Post.belongsToMany(User, { through: UserLiked, as: 'likingUsers', foreignKey: 'postId' });

// export default UserLiked;
