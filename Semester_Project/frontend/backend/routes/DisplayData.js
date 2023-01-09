const express = require("express");
const Router = express.Router();

Router.post("/foodData", (req, res) => {
  return res.send([global.food_items,global.foodCategory]).catch((err) => {
    console.log(err);
    console.log("server error");
  });
});

module.exports = Router;
