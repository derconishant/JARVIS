const { exec } = require("child_process");
const apps = require("../apps");

async function appActions(text) {

    if (!text.startsWith("open ")) return null;

    const target = text.replace("open ", "").trim();

    if (apps[target]) {

        exec(`start ${apps[target]}`);

        return `Opening ${target}.`;

    }

    return null;
}

module.exports = appActions;