const express = require('express')
const router = express.Router()
const rootDir = require('../util/path')
const path = require('path')
const products = []


router.get('/add-product', (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views', 'add-product.html'))
})

router.post('/add-product', (req,res,next)=>{
    products.push({title : req.body.title})
    res.sendFile(path.join(rootDir,'views', 'add-product.html'))
})

router.use('/product' , (req,res, next)=>{
    res.redirect('/')
})

exports.routes = router;
exports.products = products;