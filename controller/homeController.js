const userModel = require("../models/userModel");

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
    // console.log(req.body);
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
    let deleteData = await userModel.findByIdAndDelete(req.params.id);
    if (deleteData) {
      res
        .status(200)
        .json({ msg: "delete data Successfully", data: deleteData });
    } else {
      res.status(200).json({ msg: "Data not deleted.." });
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
      return res
        .status(200)
        .json({ msg: "single data Successfully...", data: singleData });
    } else {
      return res.status(200).json({ msg: "Data not found.." });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};

module.exports.updateData = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.params.id)

    let checkData = await userModel.findById(req.params.id);

    if (checkData) {
      let updateData = await userModel.findByIdAndUpdate(checkData._id,req.body);

      if (updateData) {

        let updateData = await userModel.findById(req.params.id);

        return res.status(200).json({ msg: "data updated Successfully...", data: updateData });

      } else {
        return res.status(200).json({ msg: "Data not found.." });
      }
    } else {
      return res.status(200).json({ msg: "Data not update.." });
    }
  } catch (err) {
    res.status(400).json({ msg: "something is wrong..", error: err });
  }
};
