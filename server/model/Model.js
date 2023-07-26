import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
},{
  timestamps: true,
});

const Post = db.define('post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  caption: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
  },
  likes: {
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
});

const UserLiked = db.define('UserLiked', {
 id: {
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true
},
});

Post.belongsTo(User, {
  foreignKey: 'userId',
});
User.hasMany(Post)

// Post.belongsTo(UserLiked, {
//   foreignKey: 'userId'
// })

// User.belongsTo(UserLiked, {
//   foreignKey: 'postId'
// })

User.hasMany(UserLiked)
Post.hasMany(UserLiked)
UserLiked.belongsTo(Post)
UserLiked.belongsTo(User)


User.belongsToMany(Post, { through: UserLiked });
Post.belongsToMany(User, { through: UserLiked });


export { User, Post, UserLiked };
