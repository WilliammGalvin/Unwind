const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  setCategoryIndex: (category: string, index: number) =>
    ipcRenderer.invoke("set-category-index", category, index),
  getCategoryIndex: (category: string) =>
    ipcRenderer.invoke("get-category-index", category),
});
