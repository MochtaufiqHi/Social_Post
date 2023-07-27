import { Sequelize } from "sequelize";
import { Post, User, UserLiked } from "../model/Model.js";
import { uploadFile } from "../middleware/uploadFiles.js";
// import { uploadPhoto } from "../middleware/uploadFiles.js";

export const createPost = async (req, res) => {
  try {
    const { caption, tags, image } = req.body;
    const userId = req.idUser;

    const post = await Post.create({
      caption: caption,
      tags: tags,
      userId: userId,
      image: req.files.picture[0].filename,
    });

    const createdPost = await Post.findOne({
      where: {
        id: post.id,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });

    res.status(201).json({ success: true, data: createdPost });
  } catch (error) {
    console.log("Failed to post :", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to post", data: null });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.idUser;
    let body = req.body;
    body.updatedAt = new Date();

    const isExisted = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!isExisted) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!!", data: null });
    }

    if (isExisted.userId !== userId) {
      return res.status(404).json({
        success: false,
        message: "You are not own this post!!",
        data: null,
      });
    }

    await Post.update(body, {
      where: {
        id: postId,
      },
    });

    const updatedPost = await Post.findOne({
      where: {
        id: postId,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      },
    });
    return res.status(201).json({
      success: true,
      message: "Successfully Update Post",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.idUser;

    const isExisted = await Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!isExisted) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!!", data: null });
    }

    if (isExisted.userId !== userId) {
      return res.status(404).json({
        success: false,
        message: "You are not own this post!!",
        data: null,
      });
    }

    await Post.destroy({
      where: {
        id: postId,
      },
    });

    return res
      .status(201)
      .json({ success: true, message: "Successfully Delete Post", data: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.idUser;

    const exisPost = Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!exisPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!!", data: null });
    }

    const isLiked = await UserLiked.findOne({
      where: {
        postId,
        userId,
      },
    });
    if (isLiked) {
     return res.status(403).json({
       success: false,
       message: "User Already liked post!!",
       data: null,
     });
    }
    
    const existingPost = await Post.findByPk(postId);

    if (existingPost) {
      existingPost.likes += 1;
      await existingPost.save();
    } else {
      console.log('Post not found');
    }

    const like = await UserLiked.create({
      userId,
      postId,
    });
    return res
      .status(201)
      .json({ success: true, message: "Successfully Liked Post", data: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.idUser;

    const exisPost = Post.findOne({
      where: {
        id: postId,
      },
    });

    if (!exisPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found!!", data: null });
    }

    const like = await UserLiked.destroy({
      where: {
        postId,
        userId,
      },
    });
    return res
      .status(201)
      .json({ success: true, message: "Successfully Unlike Post", data: null });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const allPosts = async (req, res) => {
  try {
    const userId = req.idUser;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const posts = await Post.findAll({
      attributes: [
        "id",
        "image",
        "caption",
        "tags",
        "createdAt",
        "updatedAt",
        [Sequelize.fn("COUNT", Sequelize.col("UserLikeds.postId")), "likes"],
      ],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt"],
          },
        },
        {
          model: UserLiked,
          attributes: [],
        },
      ],
      group: ["post.id", "UserLikeds.postId"],
    });

    res.status(200).json({
      success: true,
      message: "Successfully Get Post",
      data: posts,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findOne({
      where: { id: postId },
      attributes: [
        "id",
        "image",
        "caption",
        "tags",
        "createdAt",
        "updatedAt",
        [Sequelize.fn("COUNT", Sequelize.col("UserLikeds.postId")), "likes"],
      ],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt"],
          },
        },
        {
          model: UserLiked,
          attributes: [],
        },
      ],
      group: ["post.id", "UserLikeds.postId"],
    });
    res
      .status(200)
      .json({ success: true, message: "Successfully Get Post", data: post });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const userId = req.idUser;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const post = await Post.findAndCountAll({
      where: { userId: userId },
      attributes: ["id", "image", "caption", "tags", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt"],
          },
        },
        {
          model: UserLiked,
          attributes: [],
        },
      ],
      limit,
      offset,
      distinct: true,
    });

    if (!post.rows || post.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "Successfully Get Post",
      data: post.rows,
      pagination: {
        total: post.count,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const getAllPost2 = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const offset = (page - 1) * limit;

    const post = await Post.findAll({
      attributes: ["id", "image", "caption", "tags", "createdAt", "updatedAt"],
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password", "id", "createdAt", "updatedAt"],
          },
        },
        {
          model: UserLiked,
          attributes: [],
        },
      ],
      limit,
      offset,
      distinct: true,
    });

    res.status(200).json({
      success: true,
      message: "Successfully Get Post",
      data: post,
      pagination: {
        total: post.count,
        page,
        limit,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error", data: null });
  }
};

export const uploadImage = async (req, res) => {
  try {
    uploadFile('image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      const baseUrl = "http://localhost:5000/uploads/products/"
      const uploadedPicture = req.files.picture[0];
      const pictureBuffer = uploadedPicture.buffer;
      const pictureName = baseUrl + uploadedPicture.originalname;

      return res.status(200).json({ success: true, message: 'Image uploaded successfully', pictureName });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// export const uploadFile = async (req, res, next) => {
//   const uploadMiddleware = uploadPhoto(photoField);
//   uploadMiddleware(req, res, (err) => {
//     if(err) {
//       return res.status(400).send({
//         message: "File upload failed",
//         status: err,
//       });
//     }
//   })
// }