const {validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const jwtSecret = "MyrealnameisMuhammadMuazShoukat."



exports.postCreateUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSalt(10);
  let secPassword = await bcrypt.hash(req.body.password, salt);
  await User.create({
    name: req.body.name,
    password: secPassword,
    email: req.body.email,
  })
    .then((result) => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
};


exports.postLoginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    await User.findOne({ email })
      .then(async (user) => {
        const pwdCompare = await bcrypt.compare(req.body.password,user.password);
        if (!user || !pwdCompare) {
          return res
            .status(400)
            .json({ errors: "Try logging with correct credentials" });
        }
        const data = {
          user:{
            id:user.id
          }
        };
        const authToken = jwt.sign(data,jwtSecret);
        return res.json({ success: true,authToken:authToken });
      })
      .catch((err) => console.log(err));
  }
