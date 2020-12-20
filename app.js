const { urlencoded } = require('express')
// express :
const express = require('express')
const app = express()
// const db = require('')
const path = require('path');


// override:

const override = require('method-override')
app.use(override('_method'))

// views  && ejs-mate:
const ejsMate = require('ejs-mate')
app.set('views', path.join(__dirname, 'publicc'));
app.set('view engine', 'ejs');
app.engine('ejs',ejsMate)

// mongo

const Product = require('./db/model');
const mongoose = require('mongoose');

//categories :

const categories = [
    'fruit',
    'vegetable',
    'dairy'
]


mongoose.connect('mongodb://localhost:27017/practice1', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/',async(req,res)=>{

    const prods =await Product.find({})
    res.render('product/home',{prods})

})

app.get('/product/add',async(req,res)=>{
    
    res.render(`product/add`)
})

app.post('/product/add',async(req,res)=>{
    
    const {name,price,category} = req.body
    const pro = {
        name,
        price,
        category
    }
     const prod = new Product(pro)
    
    
    await prod.save()
    res.redirect(`/`)
})


app.get('/product/:id/edit',async(req,res)=>{
    const id = req.params.id
    const prod = await Product.findById(id)

    res.render(`product/edit`,{prod,categories})
})

app.get('/product/:id',async(req,res)=>{
    const id = req.params.id
    const prod = await Product.findById(id)

    res.render('product/show',{prod})
})

app.post('/product/:id',async(req,res)=>{
    
    const {name,price,category} = req.body;
    const id = req.params.id
    const prod = await Product.findByIdAndUpdate(id,{name,price,category})

    res.redirect(`/`)
})

app.delete('/product/:id',async(req,res)=>{
    
    const id = req.params.id
    const prod = await Product.findByIdAndDelete(id)
    res.redirect(`/`)
})



app.listen(4444)