import { app, BrowserWindow, ipcMain } from "electron";
import Store from "electron-store";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

interface StoreData {
  [key: string]: number;
}

const store = new Store<StoreData>();

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    resizable: false,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      devTools: false,
      nodeIntegration: true,
    },
  });

  mainWindow.setTitle("Unwind");
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  ipcMain.handle("get-category-index", (_, category) => {
    return store.get(category);
  });

  ipcMain.handle("set-category-index", (_, category, index) => {
    store.set(category, index);
  });
});
