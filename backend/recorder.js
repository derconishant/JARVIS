const { exec } = require("child_process");
const path = require("path");

function recordAudio(callback) {

    const output = path.join(__dirname, "audio", "input.wav");

    const cmd = `C:\\ffmpeg\\bin\\ffmpeg.exe -y -f dshow -i audio="Microphone Array (Intel® Smart Sound Technology for Digital Microphones)" -ar 16000 -ac 1 -acodec pcm_s16le -t 5 "${output}"`;

    console.log("Recording...");
    console.log(cmd);

    exec(cmd, (err, stdout, stderr) => {

        console.log("STDOUT:");
        console.log(stdout);

        console.log("STDERR:");
        console.log(stderr);

        if (err) {
            console.error("Recording Error:", err);
            return;
        }

        console.log("Recording Finished");

        callback(output);

    });

}

module.exports = recordAudio;