const mongoose = require("mongoose");

const signUpSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});


const AuthSignUp = mongoose.model("AuthSignUp", signUpSchema);
module.exports = AuthSignUp;
