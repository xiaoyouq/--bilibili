const express = require('express')
const router = express.Router()
const User = require('../User/user.js')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar') //全球公认头像
const jwt = require('jsonwebtoken')
const jsDon = require('../../config/keys.js').jswOrDown
const passport = require('passport')
router.get('/test', (req, rep) => {
  rep.json({ name: '李奔' })
})

// 注册
router.post('/register', (req, rep) => {
  User.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      return rep.status(400).json('次邮箱已被注册!')
    } else {
      const avate = gravatar.url(req.body.email,{s:'200',r:'pg',d:'mm'})
      var users = new  User({
        name: req.body.name,
        email: req.body.email,
        avate,
        password: req.body.password,
        identity:req.body.identity
      })
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(users.password, salt, (err, hash) => {
          if (err) throw err
          users.password = hash
          users.save().then(data=>{
            rep.status(200).json('储存成功')
          }).catch(error=>{
            rep.status(200).json('储存失败')
          })
        });
      });
    }

  }).catch(error => {
    rep.status(200).json({ email: '服务端报错' })
  })
})

// 登录
router.post('/login',(req,rep)=>{
  const email = req.body.email
  const password = req.body.password
  User.findOne({email}).then(data=>{
    if(!data){
      return rep.json('请先注册账号')
    }
    
    // console.log(data) 
    bcrypt.compare(password,data.password).then(isMatch=>{
      const rule = {id:data.id,name:data.name,eamil:data.email,avate:data.avate,identity:data.identity}
      if(isMatch){
        jwt.sign(rule,jsDon,{expiresIn:3600},(error,token)=>{
          if(error) throw error
          rep.json({token:'Bearer '+token,success:true})
        })
      }else{
        return rep.json('密码错误')
      }
    })

  }).catch(error=>{rep.json(error)})
})


// 请求数据
router.get('/current',passport.authenticate('jwt',{session:false}),(req,rep)=>{
  rep.json(req.user)
})

module.exports = router