const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const bycrpt = require("bcryptjs");
const jwt = require('jsonwebtoken')
//const verifyToken = require("../middleware/authverfiy")

router.get("/",async (req, res) => {
  const user = await User.find();

  if (!user) return res.status(404).json("user data not fond");

  res.status(200).send(user);
});

router.get("/:id", async (req, res) => {
  const getUserById = await User.findById(req.params.id).select("name email");

  if (!getUserById) {
    return res.status(404).json("user data not found");
  }

  return res.status(200).send(getUserById);
});

router.post("/", async (req, res) => {
  let user = new User({
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
    name: req.body.name,
    email: req.body.email,
    passwordHash: bycrpt.hashSync(req.body.passwordHash, 10),
    phone: req.body.phone,
  });

  const userSave = await user.save();

  if (!userSave) {
    return res.status(404).json("user not saved ");
  }
  return res.status(200).send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.SECRET

  if (!user) res.status(400).send("the user not found");

  if(user && bycrpt.compareSync(req.body.password, user.passwordHash)){

    const token = jwt.sign({
      userId:user._id
    },
    secret,{
      expiresIn:'1d'
    })
    res.status(200).json({token})
  }else{
    res.status(400).send('password is wrong')
  }

  //res.status(200).send(user);
});

module.exports = router;
