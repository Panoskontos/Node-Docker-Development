var express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser")

var app = express();


// mongoose.connect("mongodb://localhost:27017/testdb", {
//   useNewUrlParser: "true",
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });



app.get("/", (req, res) => {
    res.json("Hi Light friend 10");
   });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});