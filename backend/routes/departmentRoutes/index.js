import express from "express";
import Department from "../../db/models/departmentSchema.js";
import Doctor from "../../db/models/doctorSchema.js";
import checkToken from "../../middleware/checkToken.js";

const router = express.Router();

router.get("/", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const departments = await Department.find();
  return res.status(200).json(departments);
});

//get doctor by department
router.get("/doctor/:id", checkToken(["DOCTOR", "USER"]), async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.find({ department: id });
  return res.status(200).json(doctor);
});
//get doctor single page
router.get(
  "/doctor/profile/:id",
  checkToken(["DOCTOR", "USER"]),
  async (req, res) => {
    const { id } = req.params.id;
    const doctor = await Doctor.findById(id);
    return res.status(200).json(doctor);
  }
);

router.post("/", checkToken(["DOCTOR"]), async (req, res) => {
  const body = { ...req.body };
  const departments = await Department.create(body);
  return res.status(201).json(departments);
});

router.get("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  const departments = await Department.findById(id);
  return res.status(200).json(departments);
});

router.patch("/:id", checkToken(["DOCTOR"]), async (req, res) => {
  const id = req.params.id;
  await Department.findByIdAndUpdate(id, req.body);
  return res.status(200).json({
    message: "updated sucessfully",
  });
});

export default router;
