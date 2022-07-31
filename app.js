var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

// import model
const Post = require('./models/Post')


var app = express();
app.use(bodyParser.json())




// connect with db
mongoose.connect("mongodb://localhost:27017/newdb", {
  useNewUrlParser: "true",
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});




// simple get
app.get("/second", (req, res) => {
    res.json("Hi second");
   });





//    post request
app.post("/", (req, res)=>{
       const new_post = new Post({
           title: req.body.title,
           description: req.body.description
        })
        new_post.save()
        .then(data=>{
            res.json(data)
        })
        .catch(err=>{
            res.json({ message:err})
        })
    })
   
   
   
// get all request
app.get("/", async (req, res) => {
        try{
            const posts = await Post.find()
            res.json(posts)
        }catch(err){
            res.json({message:err})
        }
       });
    



app.listen(3000, () => {
 console.log("Server running on port 3000");
});