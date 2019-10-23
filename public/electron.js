const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const ElectronReload = require("electron-reload");
const isDev = require("electron-is-dev");
let mainWindow;
const Devtron = require("devtron");

ElectronReload(__dirname);
function createWindow() {
    mainWindow = new BrowserWindow(
        { width: 300, height: 300 ,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')//If your application's BrowserWindow was created with nodeIntegration set to false then you will need to expose some globals via a preload script to allow Devtron access to Electron APIs
            }
        },
    );
    Devtron.install();
    mainWindow.loadURL(
    isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    }
});