const performAction = require("./actions");
const express = require("express");
const cors = require("cors");
const { Ollama } = require("ollama");
const processVoice = require("./voice");

const app = express();

app.use(cors());
app.use(express.json());

const ollama = new Ollama();

// =====================
// Chat Endpoint
// =====================
app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;

        console.log("Received:", message);

        const actionReply = await performAction(message);

        if (actionReply) {
            return res.json({
                reply: actionReply
            });
        }

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

// =====================
// Voice Endpoint
// =====================
app.post("/voice", (req, res) => {

    processVoice((text) => {

        res.json({
            text: text
        });

    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});