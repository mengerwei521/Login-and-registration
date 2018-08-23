var express=require("express");
require("./db/index");
var Users=require("./db/model/Users")
var app=express();
app.get("/login",function (req,res) {
    var username=req.query.username;
    var pwd=req.query.pwd;
    Users.findOne({username:username,pwd:pwd},function (err,data){
        if(data){
            res.send("登录成功");
        }else {
            res.send("输入的用户名或密码不正确");
        }
    })






    
})
app.get("/regist",function (req,res) {
    var username=req.query.username;
    var pwd=req.query.pwd;
    var rePwd=req.query.rePwd;
    var email=req.query.email;
    if(pwd!==rePwd){
        res.send("两次密码输入不一致");
        return;
    }
    var usernameReg=/^[A-Za-z_0-9]{5,10}$/;
    var pwdReg=/^[A-Za-z_0-9]{6,18}$/;
    var emailReg=/^[A-Za-z_0-9]{3,10}@[A-Za-z_0-9]{2,5}\.com$/;
    if(!usernameReg.test(username)){
        res.send("输入的用户名不正确");
        return;
    }else if (!pwdReg.test(pwd)){
        res.send("输入的密码不正确");
        return;
    }else if (!emailReg.test(email)){
        res.send("输入的邮箱不正确");
        return;
    }
    Users.findOne({username:username},function (err,data) {
        if(!err&&!data){
            Users.create({username:username,pwd:pwd,email:email},function (err) {
                if(!err){
                    res.send("注册成功");
                }else {
                    console.log(err);
                }
            })

        }else {
            res.send("用户名已存在");
        }
    })





})
app.listen(3000,function (err) {
    if(!err){
        console.log("服务器启动成功");
    }else {
        console.log(err);
    }
})