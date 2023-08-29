const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const resetRoutes = require("./routes/resetPasswordRoutes");
const jobRoutes = require("./routes/jobRoutes");
const bidRoutes = require("./routes/bidRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 6000;
const URL = process.env.MONGO_URI;

mongoose
  .connect(URL)
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(
        `Mongo DB Connected Successfully & Server running on Port ${PORT}`
      )
    );
  })
  .catch((error) => console.log({ message: error.message }));

app.use("/api/v1", userRoutes);
app.use("/api/v1", resetRoutes);
app.use("/api/v1", jobRoutes);
app.use("/api/v1", bidRoutes);
app.use("/api/v1", consultationRoutes);
app.use("/api/v1", paymentRoutes);

module.exports = app;
