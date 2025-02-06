const express = require("express");
const routes = express.Router();

const passport = require("passport");
const homeCtl = require("../controller/homeController");

routes.get('/unAuth',async(req,res)=>{
    return res.status(400).json({msg:"user Auth not successfully...."})
})

routes.get("/",passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , homeCtl.viewData);
routes.post("/insertData",passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , homeCtl.insertData);
routes.delete("/deleteData/:id",passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , homeCtl.deleteData);
routes.get("/getSingleData",passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , homeCtl.getSingleData);
routes.put("/updateData/:id",passport.authenticate('jwt',{failureRedirect:'/unAuth'}) , homeCtl.updateData);

routes.use("/auth", require("./Auth"));

module.exports = routes;
