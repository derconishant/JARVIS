const {
    app,
    BrowserWindow,
    Tray,
    Menu,
    screen,
    ipcMain
} = require("electron");
const path = require("path");

let win;
let overlay;
let tray;

function createWindow() {

    win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    ipcMain.on("show-overlay", () => {
    if (overlay) {
        overlay.show();
        overlay.webContents.send("update-status", "Listening...");
    }
});

ipcMain.on("hide-overlay", () => {
    if (overlay) {
        overlay.hide();
    }
});

ipcMain.on("set-status", (event, status) => {
    if (overlay) {
        overlay.webContents.send("update-status", status);
    }
});

    win.loadFile("frontend/index.html");

    // Hide instead of closing
    win.on("close", (event) => {

        if (!app.isQuiting) {
            event.preventDefault();
            win.hide();
        }

    });
}


function createOverlay() {

    const { width } = screen.getPrimaryDisplay().workAreaSize;

    const overlayWidth = 350;
    const overlayHeight = 180;

    const margin = 20;

    const x = width - overlayWidth - margin;
    const y = margin;

    overlay = new BrowserWindow({
        width: overlayWidth,
        height: overlayHeight,

        x: x,
        y: y,

        frame: false,
        transparent: true,
        resizable: false,

        alwaysOnTop: true,

        skipTaskbar: true,

        show: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    overlay.loadFile("frontend/overlay.html");
}


app.whenReady().then(() => {

    // Start with Windows
    app.setLoginItemSettings({
        openAtLogin: true,
        openAsHidden: true
    });

    createWindow();

    createOverlay();

    // Tray
    tray = new Tray(path.join(__dirname, "icon.png"));

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Open Jarvis",
            click: () => {
                win.show();
            }
        },

        {
            label: "Show Overlay",
            click: () => {
                overlay.show();
            }
        },

        {
            label: "Hide Overlay",
            click: () => {
                overlay.hide();
            }
        },

        {
            label: "Exit",
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip("Jarvis");

    tray.setContextMenu(contextMenu);

    tray.on("double-click", () => {
        win.show();
    });

});


app.on("window-all-closed", (event) => {
    event.preventDefault();
});