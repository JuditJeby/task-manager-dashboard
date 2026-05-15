import express from 'express';
import cors from 'cors'; // 1. Add this

const app = express();
app.use(cors()); // 2. Add this

const PORT = 5000;

app.get('/', (req, res) => {
    res.send('ScholarX Task Dashboard API is running, Judit!');
});

app.listen(PORT, () => {
    console.log(`Server is live at http://localhost:${PORT}`);
});