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
      }, process.env.secretKey, {
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
}
