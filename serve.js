const express = require('express')
const app = express()
const mongoose = require('mongoose')
const keys = require('./config/keys.js').mongodb
const bodyParser = require('body-parser')
const user = require('./router/api/user.js')
const proFile = require('./router/api/proFiles.js')
const passport = require('passport')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// 查看是否成功连接成功数据
mongoose.connect(keys, { useNewUrlParser: true })
  .then(data => { console.log('成功了') })
  .catch(error => { console.log("失败了") })


  app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
  });

  // 请求接口使用
app.use('/api/user',user)
app.use('/api/proFile',proFile)

// passport初始化
app.use(passport.initialize())
require('./config/passport')(passport)

// 开发模式和测试模式
const port = process.env.PORT || 5000

app.get('/', (req, rep) => {
  rep.send("Hello Nodejs")
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})