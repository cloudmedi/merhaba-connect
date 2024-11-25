import { contextBridge, ipcRenderer } from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI', {
    getDeviceId: () => ipcRenderer.invoke('getDeviceId'),
    getDeviceToken: () => ipcRenderer.invoke('getDeviceToken'),
    registerDevice: (deviceInfo: any) => ipcRenderer.invoke('registerDevice', deviceInfo),
    send: (channel: string, data: any) => {
      // whitelist channels
      let validChannels = ['toMain']
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data)
      }
    },
    receive: (channel: string, func: Function) => {
      let validChannels = ['fromMain']
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender` 
        ipcRenderer.on(channel, (event, ...args) => func(...args))
      }
    }
  }
)