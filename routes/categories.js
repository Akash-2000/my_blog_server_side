const router = require("express").Router()
const Category = require("../models/category")

router.post("/",async(req,res)=>{
    const newcat = new Category(req.body)
    try {
        const savedcat = await newcat.save()
        res.status(200).json(savedcat)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/",async(req,res)=>{
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router