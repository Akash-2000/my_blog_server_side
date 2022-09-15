const express = require("express")
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config()
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const categotyRoute = require("./routes/categories")
const cors = require("cors")
const multer = require("multer")
const path = require("path")

app.use(cors())
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("conect to mongoose")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },filename:(req,res,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("uploades")
})
app.use("/api/auth",authRoute);

app.use("/api/users",userRoute)

app.use("/api/post",postRoute)

app.use("/api/categories",categotyRoute)

app.listen(5000,(req,res)=>{
    console.log("im im")
})