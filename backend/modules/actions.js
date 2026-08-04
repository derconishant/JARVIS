const fileActions = require("./modules/fileActions");
const appActions = require("./modules/appActions");
const websiteActions = require("./modules/websiteActions");
const searchActions = require("./modules/searchActions");

async function performAction(message) {

    const text = message.toLowerCase();

    let result;

    result = await appActions(text);
    if (result) return result;

    result = await websiteActions(text);
    if (result) return result;

    result = await searchActions(text);
    if (result) return result;

    result = await fileActions(text);
    if (result) return result;

    return null;
}

module.exports = performAction;