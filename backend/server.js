const express = require("express");
const cors = require("cors");
const { Ollama } = require("ollama");

const app = express();

app.use(cors());
app.use(express.json());

const ollama = new Ollama();

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        console.log("Received:", message);

        const response = await ollama.chat({
    model: "qwen3:0.6b",
    messages: [
        {
            role: "system",
            content: "Answer in one short sentence. Do not show reasoning."
        },
        {
            role: "user",
            content: message
        }
    ]
});

        console.log("Got response from Ollama");

        res.json({
            reply: response.message.content
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            reply: "Sorry, something went wrong."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});