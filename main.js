const { app, BrowserWindow } = require("electron");
const path = require("path");

const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
log.transports.file.resolvePath = () =>
  path.join(app.getPath("logs"), "main.log");
log.info("Application version =" + app.getVersion());

let win;
function createWindow() {
  win = new BrowserWindow({ width: 300, height: 400 });
  win.loadFile(path.join(__dirname, "index.html"));
}

app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on("checking-for-update", () => {
  log.info("Checking for update...");
});

autoUpdater.on("update-available", (info) => {
  log.info("Update available");
});

autoUpdater.on("update-not-available", (info) => {
  log.info("Update not available");
});

autoUpdater.on("error", (error) => {
  log.info("Error in auto-updater. " + error);
});

autoUpdater.on("download-progress", (progressTrack) => {
  log.info("\n\ndownload-progress");
  log.info(progressTrack);
});

autoUpdater.on("update-downloaded", () => {
  log.info("Update downloaded");
});
