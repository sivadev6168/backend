import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/doctor-booking")
  .then(() => {
    console.log("db connected");
  })
  .catch((e) => {
    console.log(e);
  });

export default mongoose;
