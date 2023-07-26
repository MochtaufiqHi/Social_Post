// import { DataTypes } from 'sequelize';
// import db from '../config/Database.js';
// import Post from './Post.js';

// const User = db.define('user', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   name: {
//     type: DataTypes.STRING,
//   },
//   username: {
//     type: DataTypes.STRING,
//   },
//   email: {
//     type: DataTypes.STRING,
//   },
//   password: {
//     type: DataTypes.STRING,
//   },
//   photo: {
//     type: DataTypes.STRING,
//   },
// },{
//   timestamps: true,
// });

// User.belongsToMany(Post, { through: UserLiked, as: 'likedPosts', foreignKey: 'userId' });
// Post.belongsToMany(User, { through: UserLiked, as: 'likingUsers', foreignKey: 'postId' });

// export default User;