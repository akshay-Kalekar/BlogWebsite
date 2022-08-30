const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
const articleRouter = require('./routes/article')
const methodOverride = require('method-override')
const app = express()

const port = 3000
const URI = `mongodb+srv://aksh:1234@nodeexpressproject.hhaxhly.mongodb.net/?retryWrites=true&w=majority`
const connectDB = require('./db/connect')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.use('/articles',articleRouter)
app.use(express.static('public'));
app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({ createddAt:'desc'})
    res.render('articles/index',{articles:articles})
    console.log(articles)
})

const start = async()=>{
try {
    await connectDB(URI)
    app.listen(process.env.PORT || port)
} catch (error) {
    console.log(error)
}
}


start()
