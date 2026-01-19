import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import propertyRoutes from './routes/property.routes.js';
// import bookingRoutes from './routes/booking.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/properties", propertyRoutes);
// app.use("/api/bookings", bookingRoutes);

export default app;