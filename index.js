const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
const articleRouter = require('./routes/article')
const methodOverride = require('method-override')
const port = 3000
const app = express()

mongoose.connect('mongodb://localhost/blog')

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

app.listen(process.env.PORT || port)
