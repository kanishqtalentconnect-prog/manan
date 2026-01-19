import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
// import bookingRoutes from './routes/booking.routes.js';

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://manan-xi.vercel.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/properties", propertyRoutes);
// app.use("/api/bookings", bookingRoutes);

export default app;