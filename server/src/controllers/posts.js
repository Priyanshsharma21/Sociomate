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