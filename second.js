const fs =  require('fs')
const express=require('express')
const app = express()
app.set('view engine','ejs')

const path = require('path')
const { response } = require('express')
const e = require('express')
const publicPath = path.join(__dirname,'public')
app.use(express.static(publicPath))
app.listen(5200)

const reqFilter=(req,resp,next)=>{
    if (!req.query.age) {
        resp.send('please provide age')
        
    } 
       else if (req.query.age<18) {
            resp.send('you cannot access this')
        }
        else{
            next()
        }
    
}
app.use(reqFilter)


//the best way of doing this 
app.get('',(_,resp)=>{
    resp.sendFile(`${publicPath}/index.html`)
})
app.get('/about',(_,resp)=>{
    resp.sendFile(`${publicPath}/about.html`)
})
app.get('*',(_,resp)=>{
    resp.sendFile(`${publicPath}/pageNotFound.html`)
})



