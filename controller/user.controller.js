const bcrypt = require("bcryptjs");
const { userModel } = require("../models");
const jwt = require("jsonwebtoken");



const login = async (req,res) => {
    const payload = req.body;

    try{
        const userExist = await userModel.findOne({ email: payload.email });
    if (!userExist) {
      res.status(400).json({
        message:"User Does Not Exist"
      })
    }
    const isValid = comparePassword(payload.password, userExist.password);
    if (!isValid) {
      res.status(400).json({
        message:"Invalid Password or Email!"
      })
    }
    const accessToken = getJwtAccessToken({
      id: userExist._id,
      email: userExist.email,
    });
    const refreshToken = getJwtRefreshToken({
      id: userExist._id,
      email: userExist.email,
    });
    res.status(200).json({
        accessToken,
        refreshToken,
    })

    }catch(err){
        res.status(400).json({
            message:"Something Went Wrong!"
        })
    }
    
  };

const register = async (req,res) => {
    try{
            const payload = req.body;
        // Check if user already exist
        const userExists = await userModel.findOne({ email: payload.email });
        if (userExists) {
        res.status(400).json({
            message:"User Already Exists!"
        })
        }
        payload.password = getHashedPassword(payload.password);
        const newUser = new userModel(payload);
        await newUser.save();
        res.status(200).json({
            message:"User Registered Successfully",
            user:newUser,
        })

    }catch(err){
        res.status(400).json({
            message:"Something Went Wrong"
        })
    }
    
  };
  
  const getHashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUND));
    return bcrypt.hashSync(password, salt);
  };
  
  const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};

async function getUser(req,res){
    try{
        const data = await userModel.findById(req.params.id);
        res.status(200).json({
            user:data,
        })
    }catch(err){
        res.status(400).json({
            error:"Cannot Find User!"
        })
    }
}

const updateUser = async (req,res)=>{
    if(req.body.password){
        req.body.password = getHashedPassword(req.body.password);
    }
    const body = req.body;
    try{
        const data = await userModel.findByIdAndUpdate(req.params.id,body);
        res.status(200).json({
            message:"User Updated Successfully!",
            user:data,
        })
    }catch(err){
        res.status(400).json({
            message:"Something Went Wrong!"
        })
    }
}


const getUsers = async (req,res)=>{
    try{
        const users = await userModel.find();
        res.status(200).json({
            message:"Customers Fetched Successfully!",
            Users:users
        })
    }catch(err){
        res.status(400).json({
            message:"Cannot Find Customers!"
        })
    }
}


function getJwtAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_TIME,
  });
}
const getJwtRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_TIME,
  });
};

module.exports = {
    login,
    register,
    getUser,
    getUsers,
    updateUser
}