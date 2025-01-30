// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  setCategoryIndex: (category: string, index: number) =>
    ipcRenderer.invoke("set-category-index", category, index),
  getCategoryIndex: (category: string) =>
    ipcRenderer.invoke("get-category-index", category),
  ipcRenderer: ipcRenderer,
});
