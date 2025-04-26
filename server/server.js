import "./config/instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import Users from "./models/User.js";
import bodyParser from "body-parser";
import AuthRouter from "./routes/AuthRouter.js";
import UserRouter from "./routes/UserRoutes.js";

const app = express();

await connectDB();

app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// app.get("/debug-sentry", function mainHandler(req, res) {
//   throw new Error("My first Sentry error!");
// });

app.post("/", async (req, res) => {
  try {
    const payload = req.body;
    const user = new Users(payload);
    const savedUser = await user.save();

    res.status(200).json({ status: "success", data: savedUser });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
