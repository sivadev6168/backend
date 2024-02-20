import express from "express";
import Appointment from "../../db/models/appointmentSchem.js";
import Slot from "../../db/models/slotSchema.js";

const router = express.Router();

router.get("/doctor/:id", async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.find({ doctor: id });
  res.status(200).json(appointment);
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.find({ user: id });
  res.status(200).json(appointment);
});

router.post("/", async (req, res) => {
  const body = { ...req.body };
  const slotId = body.slot;
  await Appointment.create(body);
  await Slot.findByIdAndUpdate(slotId, { availability: false });
  res.status(201).json({ message: "Appointment booked" });
});

export default router;
