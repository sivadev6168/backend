import express from "express";
import doctorRoutes from "./doctorRoutes/index.js";
import imageRoutes from "./imageRoutes/index.js";
import departmentRoutes from "./departmentRoutes/index.js";
import pharmacyRoutes from "./pharmacyRoutes/index.js";
import UserRoutes from "./userRoutes/index.js";
import slotRoutes from "./slotRoutes/index.js";
import appointmentRoutes from "./appointmentRoutes/index.js";
import prescriptionRoutes from "./prescriptionRoutes/index.js";
const router = express.Router();

router.use("/doctor", doctorRoutes);
router.use("/image", imageRoutes);
router.use("/department", departmentRoutes);
router.use("/pharmacy", pharmacyRoutes);
router.use("/user", UserRoutes);
router.use("/slot", slotRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/prescription", prescriptionRoutes);

export default router;
