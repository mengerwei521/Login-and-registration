var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/game",{useNewUrlParser:true});
mongoose.connection.once("open",function (err) {
    if(!err){
        console.log("数据库载入成功");
    }else {
        console.log(err);
    }
})