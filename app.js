var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

// import models
const Post = require('./models/Post')
const User = require('./models/User')

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
    




// get one  
//  commented because is problematic when creating more
// app.get('/:postid', async (req, res)=>{
//     try{
//         const post = await Post.findById(req.params.postid)
//         res.json(post)
//     }catch(err){
//         res.json({message:err})
//     }  
// })





// delete one
app.delete('/:postid', async (req, res)=>{
    try{
        const removed = await Post.remove({_id: req.params.postid})
        res.json("Item was deleted")
    }catch(err){
        res.json({message:err})
    }  
})




// updating one
app.put('/:postid', async (req, res)=>{
    try{
        const updated = await Post.updateOne(
            {_id:req.params.postid},
             {$set:{title:req.body.title, description:req.body.description}}
             )
        res.json(updated)
    }catch(err){
        res.json({message:err})
    }  
})


// USERS
app.post('/users', async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
     })
     newUser.save()
     .then(data=>{
         res.json(data)
     })
     .catch(err=>{
         res.json({ message:err})
     })
});


// get all
app.get('/users', async (req, res) => {
    try{
        const allusers = await User.find()
        res.json(allusers)
    } catch(err){
        res.json({ message:err })
    }

});






app.listen(3000, () => {
 console.log("Server running on port 3000");
});