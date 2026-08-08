const fileActions = require("./modules/fileactions");
const screenshotAction = require("./modules/screenshotAction");
const systemActions = require("./modules/systemActions");
const { exec } = require("child_process");
const apps = require("./apps");
const websites = require("./websites");
const querystring = require("querystring");

async function performAction(message) {

    const text = message.toLowerCase();

    // ==========================
    // Google Search
    // ==========================
    if (text.startsWith("search google for ")) {

        const query = text.replace("search google for ", "").trim();

        const url =
            "https://www.google.com/search?q=" +
            querystring.escape(query);

        exec(`start ${url}`);

        return `Searching Google for ${query}.`;
    }

    // ==========================
    // YouTube Search
    // ==========================
    if (text.startsWith("search youtube for ")) {

        const query = text.replace("search youtube for ", "").trim();

        const url =
            "https://www.youtube.com/results?search_query=" +
            querystring.escape(query);

        exec(`start ${url}`);

        return `Searching YouTube for ${query}.`;
    }

    // ==========================
    // Open Apps / Websites
    // ==========================
    if (text.startsWith("open ")) {

        const target = text.replace("open ", "").trim();

        if (apps[target]) {
            exec(`start ${apps[target]}`);
            return `Opening ${target}.`;
        }

        if (websites[target]) {
            exec(`start ${websites[target]}`);
            return `Opening ${target}.`;
        }
    }
        result = await fileActions(text);
        if (result) return result;
        result = await systemActions(text);
        if (result) return result;

        result = await screenshotAction(text);
        if (result) return result;

    return null;
}

module.exports = performAction;