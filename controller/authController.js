const signUpModel = require("../models/signUp");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")

module.exports.signUp = async (req, res) => {
  try {
    // console.log(req.body)
    let checkData = await signUpModel.find({ email: req.body.email }).countDocuments();
    if (checkData == 0) {
      if (req.body.password == req.body.confirmPassword) {
        req.body.password = await bcrypt.hash(req.body.password,10);
        let signUpUser =await signUpModel.create(req.body);
        if(signUpUser){
            return res.status(200).json({ msg: "signUp successfully..." });
        }
        else{
            return res.status(200).json({ msg: "signUp not successfully..." });     
        }
      } 
      else {
        return res.status(200).json({ msg: "password & confirmPassword not match" });
      }
    } else {
      return res.status(200).json({ msg: "email is already exist !! try anther way..." });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.signIn = async (req,res) => {
    try {
        // console.log(req.body)
        let checkEmail =await signUpModel.findOne({email:req.body.email})
        if(checkEmail){
            let checkPassword=await bcrypt.compare(req.body.password,checkEmail.password);
            if(checkPassword){
                let token = await jwt.sign({userData:checkEmail},"testing")
                return res.status(200).json({ msg: "signIn successfully..." ,data:token});
            }
            else{
                return res.status(200).json({ msg: "signIn not successfully..." });
            }
        }
        else{
            return res.status(200).json({ msg: "email is not valid..." });
        }

    } catch (err) {
        res.status(400).json({ msg: "something is wrong..", error: err });
    }
}