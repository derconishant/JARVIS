const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const folders = require("../folders");

async function fileActions(text) {

    console.log("fileActions called");
    console.log("Text:", text);

    if (text.startsWith("open ")) {

        const folder = text
            .replace(/^open\s+/i, "")
            .replace(/^the\s+/i, "")
            .replace(/[.,!?]/g, "")
            .trim();

            console.log("Received text:", text);
            console.log("Folder:", folder);
            console.log("Folder path:", folders[folder]);

        console.log("Folder name:", folder);
        console.log("Folder path:", folders[folder]);

        if (folders[folder]) {

            execFile("explorer.exe", [folders[folder]], (err) => {
                if (err) {
                    console.log("Explorer Error:", err);
                } else {
                    console.log("Explorer launched successfully");
                }
            });

            return `Opening ${folder}.`;
        }

        console.log("Folder not found!");
    }

    if (text.startsWith("create folder ")) {

        const folderName = text.replace(/^create folder\s+/i, "").trim();

        const folderPath = path.join(folders.desktop, folderName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
            return `Folder ${folderName} created successfully.`;
        }

        return "Folder already exists.";
    }

    return null;
}

module.exports = fileActions;