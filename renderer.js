const button = document.getElementById("ask");
const question = document.getElementById("question");
const reply = document.getElementById("reply");

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