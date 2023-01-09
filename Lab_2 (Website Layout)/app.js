const express = require("express");
const expresslayouts = require("express-ejs-layouts");

const app = express();
app.set("view engine", "ejs");
app.use(expresslayouts);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("index");
});

app.listen(3000, function () {
  console.log("Server connected successfully!!");
});
