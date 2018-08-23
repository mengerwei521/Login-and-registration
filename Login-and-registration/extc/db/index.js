// var mongoose=require('mongoose');
// mongoose.connect('mongodb：//localhost:27017/extc',{useNewUrlParser:true} )
// mongoose.connection.once('open',function(err){
//     if(!err){
//         connsole.log('数据库连接成功');
//     }else{
//         connsole.log('数据库连接成功');
//     }
// })

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/extc',{useNewUrlParser: true})
mongoose.connection.once('open', function (err) {
    if (!err) console.log('数据库连接成功了~~');
    else console.log(err);
})

