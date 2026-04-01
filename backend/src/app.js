import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import enquiryRoutes from "./routes/enquiry.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import contentRoutes from "./routes/content.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import statsRoutes from "./routes/stats.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://31.97.232.215:4001",
  "https://manan-xi.vercel.app",
  "https://manan-4vefzj2oh-kanishqtalentconnect-progs-projects.vercel.app",
  "https://manan-git-final-ui-design-kanishqtalentconnect-progs-projects.vercel.app",
  "https://manan-git-backup-v1-kanishqtalentconnect-progs-projects.vercel.app",
  "https://nirvayadevbhoomi.in",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/stats", statsRoutes);

export default app;