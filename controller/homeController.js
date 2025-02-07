const userModel = require("../models/userModel");
const path = require("path");
const fs = require("fs");

module.exports.viewData = async (req, res) => {
  try {
    let UserData = await userModel.find();
    res.status(200).json({ msg: "add data Successfully", data: UserData });
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.insertData = async (req, res) => {
  try {
    let image = "";
    if (req.file) {
      image = userModel.imgPath + "/" + req.file.filename;
    }
    req.body.UserImage = image;

    let UserData = await userModel.create(req.body);
    if (UserData) {
      res.status(200).json({ msg: "add data Successfully" });
    } else {
      res.status(200).json({ msg: "Data not added.." });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.deleteData = async (req, res) => {
  try {
    // console.log(req.params.id);
    let dataUser = await userModel.findById(req.params.id);
    // console.log(dataUser);
    if (dataUser) {
      let oldImage = path.join(__dirname, "..", dataUser.UserImage);
      try {
        fs.unlinkSync(oldImage);
      } catch (err) {
        res.status(200).json({ msg: "Image not found", error: err });
      }
    }

    let deleteData = await userModel.findByIdAndDelete(req.params.id);
    if (deleteData) {
      res.status(200).json({ msg: "delete data Successfully" });
    } else {
      res.status(200).json({ msg: "deleted done", error: err });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.getSingleData = async (req, res) => {
  try {
    // console.log(req.query.dataId)
    let singleData = await userModel.findById(req.query.dataId);
    if (singleData) {
      return res.status(200).json({ msg: "single data Successfully...", data: singleData });
    } else {
      return res.status(200).json({ msg: "Data not found.." });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.updateData = async (req, res) => {
  try {
    let checkData = await userModel.findById(req.params.id);
    if (req.file) {
      let singleData = await userModel.findById(req.query.dataId);
      if (singleData) {
        try {
          var oldImage = path.join(__dirname, "..", singleData.UserImage);
          fs.unlinkSync(oldImage);
        } catch (err) {
          console.log('Error deleting old image:', err);
        }
      }
    }

    if (checkData) {
      let updateData = await userModel.findByIdAndUpdate(checkData._id,req.body);
      if (updateData) {
        let updatedUser = await userModel.findById(req.params.id);
        return res.status(200).json({ msg: "Data updated successfully", data: updatedUser });
      } else {
        return res.status(400).json({ msg: "Data not found" });
      }
    } else {
      return res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ msg: "Something went wrong", error: err });
  }
};

