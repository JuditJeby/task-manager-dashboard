import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['Primary', 'Secondary', 'Tertiary'],
        default: 'Primary'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;