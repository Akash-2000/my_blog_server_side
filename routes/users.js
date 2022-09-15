const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")
const bcrypt = require("bcrypt")
// update
router.put("/:id",async(req,res)=>{

    if(req.body.userId === req.params.id){
                if(req.body.password){
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password,salt)
            }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true}
            );
            res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error)
    }
    } else{
        res.status(401).json("you can update only your account")
    }
    
})

//Delete
router.delete("/:id",async(req,res)=>{

    if(req.body.userId === req.params.id){
        try{
            const user = await User.findById(req.params.id);
            await Post.deleteMany({username:user.username})
             try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user delted")
    } catch (error) {
        res.status(500).json(error)
    }
        }catch(error){
            res.status(200).json("user not identied")
        }
       
    } else{
        res.status(401).json("you can Delete  only your account")
    }
    
})

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password,...others} = user._doc
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router