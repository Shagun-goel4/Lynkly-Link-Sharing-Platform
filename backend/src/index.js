import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import linksRoutes from "./routes/links.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10mb' }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/links", linksRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
