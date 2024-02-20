import express from "express";
import Order from "../../db/models/orderSchema";

const router = express.Router();

router.get("/", async (req, res) => {
  const order = await Order.find();
  return res.status(200).json({ message: "order updates" }, order);
});

router.post("/", async (req, res) => {
  const body = { ...req.body };
  await Order.create(body);
  return res.status(200).json(body);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params.id;
  await Order.findByIdAndDelete(id);
  return res.status(200).json({ message: "Order Deleted" });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params.id;
  const order = await Order.findByIdAndupdate(id, req.body);
  return res.status(200).json({ message: "Order Updated", order });
});

export default router;
