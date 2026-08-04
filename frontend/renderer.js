const mic = document.getElementById("mic");
const button = document.getElementById("ask");
const question = document.getElementById("question");
const reply = document.getElementById("reply");

// =======================
// Ask Jarvis Function
// =======================
async function askJarvis(message) {
    try {
        reply.innerText = "Thinking...";

        console.log("Sending:", message);

        const response = await fetch("http://localhost:3000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        console.log("AI Reply:", data.reply);

        // Show reply
        reply.innerText = data.reply;

        // Clean reply for speech
        let cleanReply = data.reply
            .replace(/<think>[\s\S]*?<\/think>/gi, "")
            .replace(/[*#`]/g, "")
            .replace(/\n/g, " ")
            .trim();

        if (cleanReply.length > 300) {
            cleanReply = cleanReply.substring(0, 300);
        }

        speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(cleanReply);

        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            speech.voice =
                voices.find(v => v.lang.startsWith("en")) || voices[0];
        }

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onstart = () => console.log("Speech Started");
        speech.onend = () => console.log("Speech Finished");
        speech.onerror = (e) => console.error(e);

        speechSynthesis.speak(speech);

    } catch (error) {
        console.error(error);
        reply.innerText = "Unable to connect to Jarvis.";
    }
}

// =======================
// Ask Button
// =======================
button.addEventListener("click", () => {

    const message = question.value.trim();

    if (message === "") return;

    askJarvis(message);

});

// =======================
// Microphone Button
// =======================
mic.addEventListener("click", async () => {

    try {

        reply.innerText = "🎤 Listening...";

        const response = await fetch("http://localhost:3000/voice", {
            method: "POST"
        });

        const data = await response.json();

        console.log("Recognized:", data.text);

        question.value = data.text;

        askJarvis(data.text);

    } catch (error) {

        console.error(error);

        reply.innerText = "Voice recognition failed.";

    }

});