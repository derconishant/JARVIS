const mic = document.getElementById("mic");
const button = document.getElementById("ask");
const question = document.getElementById("question");
const reply = document.getElementById("reply");

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "en-US";
recognition.continuous = false;
recognition.interimResults = false;

// 3. Microphone Button
mic.addEventListener("click", () => {
    console.log("Mic clicked");
    console.log("SpeechRecognition object:", recognition);
    recognition.start();
});

// 4. Speech Recognition Result
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;

    console.log("You said:", transcript);

    question.value = transcript;
};

// 5. Speech Recognition Error
recognition.onerror = (event) => {
    console.error(event.error);
    reply.innerText = "Speech recognition error: " + event.error;
};


button.addEventListener("click", async () => {
    try {
        const message = question.value.trim();

        if (message === "") return;

        reply.innerText = "Thinking...";

        console.log("Button clicked");

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

        // Show complete response on screen
        reply.innerText = data.reply;

        // Clean the response for speaking
        let cleanReply = data.reply
            .replace(/<think>[\s\S]*?<\/think>/gi, "")
            .replace(/[*#`]/g, "")
            .replace(/\n/g, " ")
            .trim();

        // If response is very long, speak only the first 300 characters
        if (cleanReply.length > 300) {
            cleanReply = cleanReply.substring(0, 300);
        }

        console.log("Speaking:", cleanReply);

        // Stop previous speech
        speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(cleanReply);

        const voices = speechSynthesis.getVoices();
        if (voices.length > 0) {
            speech.voice = voices.find(v => v.lang.startsWith("en")) || voices[0];
        }

        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onstart = () => console.log("Speech started");
        speech.onend = () => console.log("Speech finished");
        speech.onerror = (e) => console.error("Speech Error:", e);

        speechSynthesis.speak(speech);

    } catch (error) {
        console.error(error);
        reply.innerText = "Unable to connect to Jarvis.";
    }
});