import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task from './models/Task.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 

const PORT = 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully!'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// FETCH ALL TASKS
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE A NEW TASK WITH PRIORITY
app.post('/api/tasks', async (req, res) => {
    const newTask = new Task({
        title: req.body.title,
        priority: req.body.priority
    });
    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE STATUS (COMPLETE/INCOMPLETE)
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (task) {
            task.isCompleted = !task.isCompleted;
            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE ROUTE (FIRES WHEN CLICKING ✕)
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server is live at http://localhost:${PORT}`);
});