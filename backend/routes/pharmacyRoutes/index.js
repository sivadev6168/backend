import express from "express";
import Pharmacy from "../../db/models/pharmacySchema.js";
import checkToken from "../../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const pharmacy = await Pharmacy.find();
  return res.status(200).json(pharmacy);
});

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  const pharmacy = await Pharmacy.create(body);
  return res.status(201).json({ message: "Pharmacy created" }, pharmacy);
});

router.patch("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  const pharmacy = await Pharmacy.findByIdAndUpdate(id, req.body);
  return res
    .status(200)
    .json({ message: "Pharmacy updated successfully" }, pharmacy);
});

router.delete("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  const pharmacy = await Pharmacy.findByIdAndDelete(id);
  return res.status(200).json({ message: "Deleted succesfully" });
});

export default router;
