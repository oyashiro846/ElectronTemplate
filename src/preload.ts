// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('myAPI', {
    showContextMenu: () => ipcRenderer.send('showContextMenu'),
    showMessageBox: async (message: string) => await ipcRenderer.invoke('showMessageBox', message),
});