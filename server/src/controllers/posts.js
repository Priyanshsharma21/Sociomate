import Posts from '../models/postsModel.js';
import Users from '../models/usersModel.js';
import {
    isValid,
    validString,
    validateEmail,
    isValidReqBody,
    isValidPhoneNumber,
    isValidPassword
  } from '../utils/index.js'
 
import * as dotenv from 'dotenv'
import {
    v2 as cloudinary
} from 'cloudinary'
dotenv.config()

  export const posting = async (req, res) => {
    try {
      const { content, photo,user, tags } = req.body;
      if (!content) {
        return res.status(400).json({ status: false, message: "Enter content to post" });
      }
      const photoUrl = await cloudinary.uploader.upload(photo, {
        folder: "socioposts",
    })
      const userDetails = await Users.findById(user);
      if (!userDetails) {
        return res.status(404).json({ status: false, message: "User not found" });
      }
      const data = { content, photo: {
        id: photoUrl.public_id,
        secure_url: photoUrl.secure_url,
    }, user:userDetails._id, tags };
    const result = await Posts.create(data);
  
    res.status(201).json({ status: true, data: result });
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
  };
  
export const posts = async(req,res)=>{
    try {
        const allPosts = await Posts.find();
        res.status(200).json({status:true,data:allPosts});
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });
        
    }
};

export const postsByQuery = async(req,res)=>{
    try {
    const { tags } = req.query;
    const posts = await Posts.find({ tags: { $in: tags } });
    res.status(200).json({status:true,data:posts});
    } catch (error) {
        res.status(500).json({ status: false, error: error.message }); 
    }
};

export const connections = async(req,res)=>{
    try {
       const {userId,connectionId} = req.params; 
       const user = await Users.findById(userId);
       const connection = await Users.findById(connectionId);
       if(!user || !connection)return res.status(404).json({ status: false, message: "user not found" });
    const mutuals = user.connections.filter(connection =>
        otherUser.connections.includes(connection)
      );
      res.status(200).json({status:true,data:mutuals})
    } catch (error) {
        res.status(500).json({ status: false, error: error.message });  
    }
};

export const postUpdate = async (req,res) => {
    try {
      const {
        postId
      } = req.params

      const post = await Posts.findByIdAndUpdate(userId, req.body, {
        new: true
      })
      if (!post) return res.status(404).json({
        status: false,
        message: 'No user found',
      })
      res.status(200).json({
        status: true,
        message: "post updated successfully"
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      })
    }
  };

  export const removePost = async (req, res) => {
    try {
      const { postId } = req.params;
      const user = await Users.findOneAndDelete({ _id: postId });
      if (!user) {
        return res.status(404).json({
          status: false,
          error: 'Post not found',
        });
      }
      res.json({
        status: true,
        message: 'Post successfully removed',
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  };
  