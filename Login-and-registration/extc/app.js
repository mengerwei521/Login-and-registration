var  express=require('express');
//连接数据库
require('./db');
//引入Users模块
var Users=require('./model/Users');
//创建应用模块
var app=express();
app.get('/login',function(req,res){
    var username=req.query.username;
    var pwd=req.query.pwd;
    // var usernameReg = /^[A-Za-z_0-9]{5,10}$/   //用户名：数字字母下划线，长度5-10
    // var pwdReg = /^[A-Za-z_0-9]{3,6}$/   //密码：数字字母下划线，长度3-6
    // 登录逻辑：
    // 用户名登录的书写是否符合规范
    // 用户名对，登录密码和注册密码不一致
    // 用户名和密码都对，登录成功，七天免登录，cookies,未完成；

    Users.findOne({username:username,password:pwd},function(err,data){
        if(!err && data){
            //方法没有出错并找到相同的用户名


            res.send('登录成功');


        }else{
            //方法出错了并且 找到相同的用户名

            res.send('用户名密码输入不正确，请重新输入')

        }
    })
})
app.get('/regist',function(req,res){
 // 获取用户填写的信息

    // console.log(req.query);
    var username=req.query.username;

    var pwd=req.query.pwd;

    var repwd=req.query.repwd;
    var email=req.query.email;

 //    验证用户两次输入密码是否正确
    if(pwd !== repwd){
        res.send('两次密码出错，请重新输入');
      return;
    }
 //    正则验证用户输入的是否规范
    var usernameReg = /^[A-Za-z_0-9]{5,10}$/   //用户名：数字字母下划线，长度5-10
    var pwdReg = /^[A-Za-z_0-9]{3,6}$/   //密码：数字字母下划线，长度3-6
    var emailReg=/^[A-Za-z_0-9]{3,10}@[0-9]{2,5}\.com$/ //邮箱： 3-10@ 2-5.com
    if(!usernameReg.test(username)){
        res.send('用户名不符合规范，可以输入数字字母下划线，长度5-10，请重新输入');
      return;
    }else if(!pwdReg.test(pwd)){
        res.send('密码不符合规范，可以输入数字字母下划线，长度5-10，请重新输入');
      return;
    }else if(!emailReg.test(email)){
        res.send('邮箱不符合规范， 请重新输入');
      return;
    }
    //    数据库查找是否有相同的用户名
Users.findOne({username:username},function(err,data){
        if(!err && !data){
            //方法没有出错并且没有找到相同的用户名
            //   5 将用户的注册的信息保存数据库，注册成功
           Users.create({username:username, pwd:pwd,email:email},function(err){
               if(!err) res.send('注册成功');
               else console.log(err)
           })
        }else{
        //方法出错了并且 找到相同的用户名

      res.send('用户名已经存在，请重新输入')

        }
})

 //    如果有的话，则注册失败




})
app.listen('3000',function(err){
    if(!err){
        console.log('服务器启动成功');
    }else{
        console.log('服务器启动失败');
    }
})