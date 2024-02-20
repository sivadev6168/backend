import express from "express";
import User from "../../db/models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/", async (req, res) => {
  const user = await User.find();
  return res.status(200).json(user);
});

router.get("/user/:id", async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  return res.status(200).json(user);
});

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const isUser = await User.findOne({ username: body.username });
  if (isUser) {
    res.status(409).json({ message: "username already taken" });
  }
  if (body.password != body.confirmedPassword) {
    res.status(403).json({ message: "password don't match" });
  }
  const hashedpassword = await bcrypt.hash(body.password, 2);
  body.password = hashedpassword;
  await User.create(body);
  return res.status(200).json({ message: "signup sucessfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(401).json({ message: "username or password incorrect" });
  }
  console.log(user.password);
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(401).json({ message: "username or password incorrect" });
  }

  const token = jwt.sign(
    { id: user._id, role: "USER" },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).json({ message: "login sucessfull", token: token });
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const user = User.findByIdAndUpdate(id, req.body);
  return res.status(200).json({ message: "updated Sucessfully" }, user);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  return res.status(200).json({ message: "User Deleted" });
});

export default router;
