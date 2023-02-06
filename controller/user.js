const userModel = require(`../model/user`);
const { validationResult } = require(`express-validator`);
const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcryptjs`);
//var rp = require('request-promise');
// var // Raven = require('// Raven');
let authConfig = require('../config/auth-config');
let validateLogin = require('../validation/user-validation');
const app = require('../router/router');

exports.postRegister = async (req, res) =>
 {

    try {
      const { userName, gender, email, password ,dateOfBirth,status} = req.body;

      if (!(userName, gender, email, password ,dateOfBirth,status)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }   
     let encryptedPassword = await bcrypt.hash(password, 12);

      const user = await userModel.create({
        userName,
        gender,
        email: email.toLowerCase(),
        dateOfBirth,
        status,
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.JWTKEY,
        {
          expiresIn: "24h",
        }
      );
      
      user.token = token;
      res.status(200).send({ user, message:"user is succes register"})
    } catch (err) {
      res.status(401).send({err ,message :"error in registeration"});
    } 
  }
  exports.postLogin=async(req,res)=>{
  try {
        const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        { user_id: user._id},
        process.env.JWTKEY,
        {
          expiresIn: "1024h",
        }
      );
      user.token = token;
      user.save()
      res.status(200).send({ user, message:"user is succes login"})
    }else{
      res.status(500).send({  message:"wrong password"})

    }
  } catch (err) {
    res.status(400).send({ err, message:"invalid user"})
  }
};

exports.postSignOut=async(req,res)=>{
  try {
    const authHeader = req.headers["Authorization"];
    jwt.sign(authHeader, "", (logout, err) => {
      if (logout) {
        res.send({msg : 'You have been Logged Out' });
      }
      else {
        res.send({msg:'Error'});
      }
    });
  } catch (error) {
    res.status(400).send({ error, message:"logout error"})
  }
};

exports.getProfile=async(req,res)=>{
    try {
      const user  = await userModel.find();
      
      if(!user){
          return res.json({message:'No user found'})
      }
      return res.json({
        user:user              
      })
      
  } catch (error) {
      return res.json({ error: error });  
  }
    
}
  