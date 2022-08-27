const { Router } = require('express')
const express  = require('express')
const Article =  require('./../models/article')
const route =  express.Router()

route.get('/new',(req,res)=>{
res.render('articles/new',{article : new Article() })
})
route.get('/edit/:id',async(req,res)=>{
    const article = await Article.findById(req.params.id)
    res.render('articles/edit',{article: article})
})

route.get('/:slug', async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    if( article == null ) res.redirect('/')
    res.render('articles/show',{ article: article})
})
route.post('/',async (req,res,next)=>{
    req.article = new Article()
    next()
},saveArticleAndRedirect('new'))

route.put('/:id', async(req,res,next)=>{
    req.article = await Article.findById(req.params.id)
    next()
},saveArticleAndRedirect('edit'))

route.delete('/:id',async(req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path){
    return async (req,res)=>{
        let article = req.article 
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e){
            console.log(e)
            res.render(`articles/${path}`,{article: article})
        }
    }
}

module.exports = route