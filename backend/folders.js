const os = require("os");
const path = require("path");

module.exports = {
    downloads: path.join(os.homedir(), "Downloads"),
    documents: path.join(os.homedir(), "Documents"),
    desktop: path.join(os.homedir(), "Desktop"),
    pictures: path.join(os.homedir(), "Pictures"),
    videos: path.join(os.homedir(), "Videos"),
    music: path.join(os.homedir(), "Music")
};