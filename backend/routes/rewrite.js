// router.post('/rewrite', async (req, res) => {
//     const { message, tone, type } = req.body;

//     // Validation
//     if (!message || !tone || !type) {
//         return res.status(400).json({ success: false, error: "Details missing" });
//     }

//     try {
//         // Prompt Builder: Type (Email/Message) ko use kar rahe hain
//         const promptParts = [
//             `Rewrite the following content as a `, 
//             type, 
//             ` in a `, 
//             tone, 
//             ` tone. `,
//             type === 'email' ? 'If it is an email, include a suitable subject line.' : '',
//             ` Content: `, 
//             message
//         ];
        
//         const finalPrompt = promptParts.reduce((acc, curr) => acc + curr, "");

//         const response = await openai.chat.completions.create({
//             model: "google/gemini-2.0-flash-lite-001", 
//             messages: [
//                 { role: "system", content: `You are an expert in writing ${type}s.` },
//                 { role: "user", content: finalPrompt }
//             ],
//         });

//         res.json({ 
//             success: true, 
//             rewritten: response.choices[0].message.content.trim() 
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, error: "AI API Failure" });
//     }
// });

import express from 'express';
import { OpenAI } from 'openai';

const router = express.Router();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

router.post('/rewrite', async (req, res) => {
    const { message, tone, type = 'email' } = req.body; // default type to 'email'

    if (!message || !tone) {
        return res.status(400).json({ success: false, error: "Missing fields" });
    }

    try {
        const prompt = `Rewrite this ${type} in a ${tone} tone: ${message}`;

        const response = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-lite-001",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({ 
            success: true, 
            rewritten: response.choices[0].message.content.trim() 
        });
    } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ success: false, error: "AI API Failure" });
    }
});

// ❗ YE LINE SABSE JAROORI HAI ❗
export default router;