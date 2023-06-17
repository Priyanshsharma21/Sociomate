import Users from '../models/usersModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  isValid,
  validString,
  validateEmail,
  isValidReqBody,
  isValidPhoneNumber,
  isValidPassword
} from '../utils/index.js'



export const signup = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      password
    } = req.body;

    if (!name || !mobile || !email || !password) return res.status(400).json({
      status: false,
      message: 'Please enter all the mendatory fields'
    });


    if (!isValidReqBody(req.body)) {
      return res.status(400).json({
        status: false,
        message: "Please enter all the fields"
      })
    }

    if (!isValid(name)) {
      return res.status(400).json({
        status: false,
        message: 'Please enter a correct name isValid error',
      });
    }

    if (!validString(name)) {
      return res.status(400).json({
        status: false,
        message: 'Please enter a correct name validString error',
      });
    }


    if (!isValidPhoneNumber(mobile)) {
      return res.status(400).json({
        status: false,
        message: 'Please enter a correct Mobile Number isValidPhone Number error',
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({
        status: false,
        message: 'Please enter a correct email validEmail error',
      });
    }

    if (!isValidPassword(password)) {
      return res.status(400).json({
        status: false,
        message: 'Password must be 8 char long, combination of upper and lower case and must contain a special symbole.',
      });
    }


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
    })


  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
}



export const login = async (req, res) => {
  try {
    const {
      mobile,
      password
    } = req.body;


    if (!mobile || !password) {
      return res.status(400).json({
        status: false,
        message: "Please enter required fields."
      })
    }

    if (!isValidReqBody(req.body)) {
      return res.status(400).json({
        status: false,
        message: "Please enter all the fields"
      })
    }



    //searching the user in DB 
    const user = await Users.findOne({
      mobile: mobile
    })


    if (!user) return res.status(400).json({
      status: false,
      message: 'enter correct mobile or signup now!'
    })


    const checkPass = await bcrypt.compare(password, user.password)

    if (checkPass === false) return res.status(400).json({
      status: false,
      message: 'password is incorrect!'
    })

    const token = jwt.sign({
      userId: user._id.toString()
    }, process.env.JWT_SECRET, {
      expiresIn: '3d'
    })

    res.header('auth-token', token)

    res.status(200).json({
      status: true,
      data: token
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
}



export const fetchUser = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await Users.findById(userId)

    if (!user) return res.status(404).json({
      status: false,
      message: 'no user found'
    })

    res.status(200).json({
      status: true,
      data: user
    })
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
}



export const getUserByQuery = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile
    } = req.query

    // console.log(name,email,mobile)


    const user = await Users.find({
      $or: [{
        name
      }, {
        email
      }, {
        mobile
      }]
    })


    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'No user found',
      });
    }


    res.status(200).json({
      status: true,
      data: user
    })


  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
}



export const connections = async (req, res) => {
  try {
    const { userId, connectionId } = req.params;

    const isUser = await Users.findById(userId);
    const isConnectionPresent = await Users.findById(connectionId);

    if (!isUser) return res.status(404).json({ status: false, message: "No User Found" });
    if (!isConnectionPresent) return res.status(404).json({ status: false, message: "No Connection Found" });

    if (isUser.connections.includes(connectionId)) {
      // Connection already exists, so remove it
      isUser.connections.pull(connectionId);
      await isUser.save();

      res.status(200).json({
        status: true,
        message: "Connection removed",
        data: isUser,
      });
    } else {
      // Connection doesn't exist, so add it
      isUser.connections.push(connectionId);
      await isUser.save();

      res.status(200).json({
        status: true,
        message: "Connection added",
        data: isUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};




export const profileUpdate = async (req, res) => {
  try {
    const {
      userId
    } = req.params


    const user = await Users.findByIdAndUpdate(userId, req.body, {
      new: true
    })



    if (!user) return res.status(404).json({
      status: false,
      message: 'No user found',
    })


    res.status(200).json({
      status: true,
      data: user
    })


  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    })
  }
};

