const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const imagePath = "/uploads";

const userSchema = mongoose.Schema(
  {
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
    gender: {
      type: String,
      require: true,
    },
    hobby: {
      type: Array,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    UserImage: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


const StorageImage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '..', imagePath));
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
  }
})

userSchema.statics.uploadImageFile = multer({ storage: StorageImage }).single('image');
userSchema.statics.imgPath = imagePath;



const User = mongoose.model("user", userSchema);
module.exports = User;
