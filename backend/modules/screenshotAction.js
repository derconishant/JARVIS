const screenshot = require("screenshot-desktop");
const path = require("path");

async function screenshotAction(text) {

    if (text !== "take screenshot") {
        return null;
    }

    try {

        const filePath = path.join(__dirname, "..", "screenshots", `screenshot-${Date.now()}.png`);

        await screenshot({
            filename: filePath
        });

        return "Screenshot taken successfully.";

    } catch (err) {

        console.error(err);

        return "Unable to take screenshot.";
    }
}

module.exports = screenshotAction;