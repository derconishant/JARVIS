const { exec } = require("child_process");
const websites = require("../websites");

async function websiteActions(text) {

    if (!text.startsWith("open ")) return null;

    const target = text.replace("open ", "").trim();
    console.log("Target:", target);

    if (websites[target]) {

        exec(`start ${websites[target]}`);

        return `Opening ${target}.`;

    }

    return null;
}

module.exports = websiteActions;