const express = require('express')
const router = express.Router()
const path = require('path')
const rootDir = require('../util/path')
const adminData =require('./admin')

router.get('/', (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views', 'shop.html'))
    res.render('shop' , {prods:adminData.products, docTitle:'Shop 123' })
})

module.exports = router