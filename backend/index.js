import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import partnerRoutes from './routes/partnerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import authRoutes from './routes/authRoutes.js'; 
import path from 'path';


dotenv.config();
connectDB();

const app = express();

const _dirname = path.resolve();

const PORT = process.env.PORT || 5000;
const corsOption = {
  origin: "https://production-smartdelivery.onrender.com",
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());

// Routes
app.use('/api/partners', partnerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/auth', authRoutes); // Add the auth routes for login, register, and logout

app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(_,res)=>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
