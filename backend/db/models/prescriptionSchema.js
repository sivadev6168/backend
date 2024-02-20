import { Schema, model } from "mongoose";

const prescriptionSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  message: {
    type: String,
  },
  medication: [
    {
      type: Schema.Types.ObjectId,
      ref: "Pharmacy",
    },
  ],
  appointment: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
  },
});

const Prescription = model("Prescription", prescriptionSchema);

export default Prescription;
