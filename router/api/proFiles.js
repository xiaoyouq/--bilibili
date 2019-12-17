const express = require('express')
const router = express.Router()
const proFile = require('../User/proFile.js')
const passport = require('passport')


// 查找单个
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, rep) => {
  proFile.findOne({ _id: req.params.id }).then(data => {
    if (!data) {
      return rep.status(200).json('没有找到')
    }
    rep.json(data)
  }).catch(error => {
    console.log(error)
  })
})


// 查找所有
router.post('/', passport.authenticate('jwt', { session: false }), (req, rep) => {
  proFile.find().then(proFile => {
    if (proFile) return rep.json(proFile)
    rep.json('没有信息')
  })
})

// 增加
router.post('/add', passport.authenticate('jwt', { session: false }), (req, rep) => {
  const proFilesq = {}
  if (req.body.type) proFilesq.type = req.body.type
  if (req.body.describe) proFilesq.describe = req.body.describe
  if (req.body.income) proFilesq.income = req.body.income
  if (req.body.expend) proFilesq.expend = req.body.expend
  if (req.body.cash) proFilesq.cash = req.body.cash
  if (req.body.remark) proFilesq.remark = req.body.remark

  new proFile(proFilesq).save().then(data => {
    rep.json(data)
  })
})


// 修改单个
router.post('/updata/:id', passport.authenticate('jwt', { session: false }), (req, rep) => {
  const proFilesq = {}
  if (req.body.type) proFilesq.type = req.body.type
  if (req.body.describe) proFilesq.describe = req.body.describe
  if (req.body.income) proFilesq.income = req.body.income
  if (req.body.expend) proFilesq.expend = req.body.expend
  if (req.body.cash) proFilesq.cash = req.body.cash
  if (req.body.remark) proFilesq.remark = req.body.remark
  proFile.updateOne({ _id: req.params.id }, { $set: proFilesq }, { new: true }).then(data => {
    rep.json(data)
  })
})



// 删除
router.delete('/delete/:id', (req, rep) => {
  console.log(req.params.id)
  proFile.deleteOne({ _id: req.params.id }).then(data => {
    // data.save().then(data=>{
      rep.json(data)
    // })
  })
})


module.exports = router