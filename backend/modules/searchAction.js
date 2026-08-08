const { exec } = require("child_process");
const querystring = require("querystring");

async function searchActions(text) {

    if (text.startsWith("search google for ")) {

        const query = text.replace("search google for ", "").trim();

        exec(`start https://www.google.com/search?q=${querystring.escape(query)}`);

        return `Searching Google for ${query}.`;
    }

    if (text.startsWith("search youtube for ")) {

        const query = text.replace("search youtube for ", "").trim();

        exec(`start https://www.youtube.com/results?search_query=${querystring.escape(query)}`);

        return `Searching YouTube for ${query}.`;
    }

    return null;
}

module.exports = searchActions;