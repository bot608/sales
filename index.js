const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { productRoutes, userRoutes } = require("./routes");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());
app.use("/api/product",productRoutes);
app.use("/api/user",userRoutes);

app.listen(5000, async () => {
  console.log("Connected to Server to Port 5000");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DataBase Success!!!");
  } catch (error) {
    console.log("DB Connection Error message : ", error.message);
  }
});
