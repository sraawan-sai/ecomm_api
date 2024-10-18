const {Product} = require('../models/products')
const { Category } = require("../models/category");
const express = require("express");
const router = express.Router()


router.get('/', async (req, res) => {

    const productsList = await Product.find()
 
    if(!productsList){
      res.status(500).json({success:false})
    }
    
    res.send(productsList);
  });
  
  router.get('/:id', async(req,res)=>{
     const findproduct = await Product.findById(req.params.id).populate("category");
     if(!findproduct){
      res.status(500).json({succes:true,smessage:'prodcut not found'})
     }
     res.send(findproduct)
  })
  router.post('/',  async(req, res) => {
 
    const category = await Category.findById(req.body.category)

    if(!category){
      res.status(400).json('Invalid category')
    }
  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    price: req.body.price,
    description: req.body.description,
    image:req.body.image,
    richDescription:req.body.richDescription,
    countInStock:req.body.countInStock,
    rating:req.body.rating,
    category:req.body.category,
    numReviews:req.body.numReviews,
    isFeatured:req.body.isFeatured

  })
  product.save().then((createproduct=>{
    res.status(201).json(createproduct)
  })).catch((err)=>{
    res.status(500).json({
      error:err,
      success:false
    })
  })
   
  });

  router.put('/:id',async (req,res)=>{
    const updateProduct = await Product.findByIdAndUpdate(req.params.id,
      {name: req.body.name,
        brand: req.body.brand,
        price: req.body.price,
        description: req.body.description,
        image:req.body.image,
        richDescription:req.body.richDescription,
        countInStock:req.body.countInStock,
        rating:req.body.rating,
        category:req.body.category,
        numReviews:req.body.numReviews,
        isFeatured:req.body.isFeatured},{new:true}
    )

    if(!updateProduct){
      res.status(404).send({Meessage:'product id not found'})
    }
    res.send(updateProduct)

  })

router.get(`/get/count`,async(req,res)=> {
  const productCount = await Product.countDocuments({}).exec()
  if(!productCount){
    res.status(500).json({succes:false})
  }
  res.send({productCount:productCount})
})
router.get(`/get/featured/:count`,async(req,res)=> {
  const count = req.params.count ? req.params.count :0
  const featured = await Product.find({isFeatured:true}).limit(+count)
  if(!featured){
    res.status(500).json({succes:false})
  }
  res.send({productCount:featured})
})
  module.exports= router