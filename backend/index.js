// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import rewriteRouter from './routes/rewrite.js'; // Check karo ki '.js' likha hai

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Routes setup 
// app.use('/ai', rewriteRouter); 

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rewriteRouter from './routes/rewrite.js';

const app = express();

app.use(cors());
app.use(express.json());

// Add health-check route
app.get('/', (req, res) => res.send('OK'));

// Routes
app.use('/ai', rewriteRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});