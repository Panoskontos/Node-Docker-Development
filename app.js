var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.json("Hi Light friend 10");
   });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});