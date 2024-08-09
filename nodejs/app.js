const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')

app.set('view engine' , 'pug')
app.set('views' , 'views')

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminRoutes.routes)
app.use(shopRoutes)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, 'views', '404.html'))

})


app.listen(1234)

// module.exports = path.dirname(require.main.filename);