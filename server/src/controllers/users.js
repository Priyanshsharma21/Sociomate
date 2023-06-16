import Users from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      password
    } = req.body;
    
    //validations    
    if (req.body === null) res.status(400).json({
      status: false,
      message: 'empty data, fill the form!'
    });
    if (!name) return res.status(400).json({
      status: false,
      message: 'name is required!'
    });
    if (!mobile) return res.status(400).json({
      status: false,
      message: 'mobile number is required!'
    });
    if (!email) return res.status(400).json({
      status: false,
      message: 'email is required!'
    });
    if (!password) return res.status(400).json({
      status: false,
      message: 'password is required!'
    });
    //hashing the password
    const hashedPass = await bcrypt.hash(password, 10);
    //signing up user 
    const userDetails = {
      name,
      mobile,
      email,
      password: hashedPass
    };
    const data = await Users.create(userDetails);
    res.status(201).json({
      status: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};




export const login = async (req, res) => {
  try {
    const {
      mobile,
      password
    } = req.body;
    //validations
    if (req.body === null) res.status(400).json({
      status: false,
      message: 'empty data, fill the form!'
    });
    if (!mobile) return res.status(400).json({
      status: false,
      message: 'mobile number is required!'
    });
    if (!password) return res.status(400).json({
      status: false,
      message: 'password is required!'
    });
    //searching the user in DB 
    const user = await Users.findOne({
      mobile: mobile
    });
    if (!user) return res.status(400).json({
      status: false,
      message: 'enter correct mobile or signup now!'
    });
    const checkPass = await bcrypt.compare(password, user.password);
    if (checkPass === false) return res.status(400).json({
      status: false,
      message: 'password is incorrect!'
    });
    if (checkPass === true) {
      const token = jwt.sign({
        userId: user._id.toString()
      }, process.env.JWT_SECRET, {
        expiresIn: '3d'
      });
      res.setHeader('auth-token', token)
      res.status(200).json({
        status: true,
        data: token
      });
    }

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

export const fetchUser = async(req,res)=>{
  try {
    const userId = req.params.userId;
    const user = await Users.findById(userId)
    if(!user) return res.status(404).json({
      status: false,
      message: 'no user found'
    });
    res.status(200).json({status:true,data:user})
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};

export const users = async (req, res) => {
  try {
    const { name, email, mobile } = req.query;
    const user = await Users.find({$or:[{name},{email},{mobile}]});
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'No user found',
      });
    }
    res.status(200).json({ status: true, data: user });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const connections = async(req,res)=>{
  try {
    const {userId,connectionId} = req.params;
    const user = await Users.findOneAndUpdate({_id:userId},{$addToSet:{connections:connectionId}},{new:true});
    if(!user)return res.status(404).json({
      status: false,
      message: 'No user found',
    });
    res.status(200).json({status:true,data:user})
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

export const profileUpdate = async(req,res)=>{
  try {
    const {userId} = req.params;
    const user = await Users.findByIdAndUpdate(userId,req.body,{new:true});
    if(!user)return res.status(404).json({
      status: false,
      message: 'No user found',
    });
    res.status(200).json({status:true,data:user})
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};