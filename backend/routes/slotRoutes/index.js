import express from "express";
import Slot from "../../db/models/slotSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const slot = await Slot.find();
  res.status(200).json(slot);
});

router.get("/doctor/:id", async (req, res) => {
  const { id } = req.params;
  const slot = await Slot.find({ doctor: id });
  res.status(200).json(slot);
});

router.post("/", async (req, res) => {
  const body = [...req.body];
  await Slot.insertMany(body);
  res.status(201).json({ message: "Slots updated" });
});

export default router;
