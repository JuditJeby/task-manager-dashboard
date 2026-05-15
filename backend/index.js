import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 1. Load the secret variables from your .env file
dotenv.config();

const app = express();

// 2. Middlewares (The 'Security Guards')
app.use(cors());
app.use(express.json()); // Allows the server to read JSON data

const PORT = 5000;

// 3. The Database Connection Logic
// This uses the "MONGO_URI" name we created in your .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// 4. A simple route to test if the backend is live
app.get('/', (req, res) => {
    res.send('ScholarX Task Dashboard API is running and connected to DB!');
});

// 5. Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server is live at http://localhost:${PORT}`);
});