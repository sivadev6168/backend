import { Schema, model } from "mongoose";

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pharmacy: {
    type: Schema.Types.ObjectId,
    ref: "Pharmcy",
  },
  prescription: {
    type: Schema.Types.ObjectId,
    ref: "Prescription",
  },
});

const Order = model("Order", orderSchema);
export default Order;
