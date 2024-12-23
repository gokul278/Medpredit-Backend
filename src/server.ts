require("dotenv").config();

const express = require("express");
import AssistantRoutes from "./Routes/Assistant/AssistantRoutes";
import AuthenticationRoutes from "./Routes/Authentication/AuthenticationRoutes";
import DoctorRoutes from "./Routes/Doctor/DoctorRoutes";
import PatientRoutes from "./Routes/Patient/PatientRoutes";
const cors = require("cors");

import userRoutes from "./Routes/User/UserRoutes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", AuthenticationRoutes);
app.use("/api/v1", AssistantRoutes);
app.use("/api/v1", DoctorRoutes);
app.use("/api/v1", PatientRoutes);

app.listen(process.env.PORT);
