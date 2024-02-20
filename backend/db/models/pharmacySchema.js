import { Schema, model } from "mongoose";

const pharmacySchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

const Pharmacy = model("Pharmcy", pharmacySchema);

export default Pharmacy;
