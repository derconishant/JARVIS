const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

function transcribe(audioPath, callback) {

    const whisperExe = path.join(__dirname, "..", "whisper", "whisper-cli.exe");
    const model = path.join(__dirname, "..", "whisper", "models", "ggml-small.en.bin");

    const command = `"${whisperExe}" -m "${model}" -f "${audioPath}" -otxt`;

    console.log("Transcribing...");

    exec(command, (err) => {

        if (err) {
            console.log(err);
            return;
        }

        const txtFile = audioPath + ".txt";

        const text = fs.readFileSync(txtFile, "utf8");

        callback(text.trim());

    });

}

module.exports = transcribe;