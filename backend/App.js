// This file was a duplicate Express server implementation using CommonJS.
// Server entrypoint is `index.js`. Remove this file or keep as reference.

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors()); // Isse mobile/frontend se request block nahi hogi
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/rewrite', async (req, res) => {
    try {
        const { text } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const prompt = `Rewrite this email professionally: ${text}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ rewrittenText: response.text() });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "mistake in ai response" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));