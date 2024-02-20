import express from "express";
import Prescription from "../../db/models/prescriptionSchema.js";
import Pharmacy from "../../db/models/pharmacySchema.js";

const router = express.Router();

//add prescription by doctor
router.post("/doctor", async (req, res) => {
  const body = { ...req.body };
  await Prescription.create(body);
  res.status(200).json(body);
});

//list priscription by appointment
router.get("/appointment/:id", async (req, res) => {
  const { id } = req.params;
  const prescription = await Prescription.find({ appointment: id });
  res.status(200).json(prescription);
});

//get medicins by prescription id so user can get their added medicines
router.get("/pharmacy/:id", async (req, res) => {
  const { id } = req.params;
  const prescription = await Prescription.find({ appointment: id });
  const pharmacy = await Pharmacy.find({
    _id: { $in: prescription.medication },
  });
  res.status(200).json(prescription);
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  await Prescription.findByIdAndUpdate(id, req.body);
  return res.status(200).json({
    message: "updated sucessfully",
  });
});

export default router;
