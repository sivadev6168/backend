import express from "express";
import bcrypt from "bcrypt";
import Doctor from "../../db/models/doctorSchema.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req, res) => {
  const doctor = await Doctor.find();
  return res.status(200).json(doctor);
});

router.get("/doctor/:id", async (req, res) => {
  const id = req.params.id;
  const doctor = await Doctor.findById(id).populste("department");
  return res.status(200).json(doctor);
});

router.post("/signup", async (req, res) => {
  const body = { ...req.body };
  const isDoctor = await Doctor.findOne({ username: body.username });
  if (isDoctor) {
    res.status(409).json({ message: "username already taken" });
  }
  if (body.password != body.confirmedPassword) {
    res.status(403).json({ message: "password don't match" });
  }

  const hashedpassword = await bcrypt.hash(body.password, 2);
  body.password = hashedpassword;
  await Doctor.create(body);
  return res.status(200).json({ message: "signup sucessfull" });
});

router.post("/login", async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    return res.status(401).json({ message: "username or password incorrect" });
  }

  const isMatching = await bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    return res.status(401).json({ message: "username or password incorrect" });
  }

  const token = jwt.sign(
    { id: doctor._id, role: "DOCTOR" },
    process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );

  return res.status(200).json({ message: "login sucessfull", token: token });
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const doctor = Doctor.findByIdAndUpdate(id, req.body);
  return res.status(200).json({ message: "updated Sucessfully" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Doctor.findByIdAndDelete(id);
  return res.status(200).json({ message: "Doctor Deleted" });
});

export default router;
