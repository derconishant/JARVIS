const recordAudio = require("./recorder");
const transcribe = require("./transcribe");

function processVoice(callback) {
    recordAudio((audioFile) => {
        transcribe(audioFile, (text) => {
            callback(text);
        });
    });
}

module.exports = processVoice;