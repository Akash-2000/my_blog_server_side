const router = require("express").Router()
const User = require("../models/user")
const Post = require("../models/post")

// creata post

router.post("/",async(req,res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)        
    }
});
// update
router.put("/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
         if(post.username === req.body.username){     
               try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                        $set: req.body,
                    },{new:true});
                    res.status(200).json(updatedPost)
        } catch (error) {
            res.status(501).json(error)
        }
}else{
    res.status(401).json("You can update only your post")
}
 
     } catch (error) {
        
    }
})

//Delete
router.delete("/:id",async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
         if(post.username === req.body.username){     
               try {
                await post.delete();    
                res.status(200).json("post dedleted...")
        } catch (error) {
            res.status(200).json(error)
        }
}else{
    res.status(401).json("You can delete only your post")
}
 
     } catch (error) {
        
    }
})

//get post
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
})

//get All
router.get("/",async(req,res)=>{
    const username = req.query.username
    
    const catName = req.query.cat
    console.log(catName)
    try{
        let  posts;
        if(username){
            posts = await Post.find({username})
        }else if(catName){
            posts = await Post.find({categories:{
                $in:[catName]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json({"ak":1})
    }
})

module.exports = router