import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import * as si from 'systeminformation'
import dotenv from 'dotenv'
import { getDeviceIdentifier } from '../utils/deviceIdentifier'

// Load .env file
dotenv.config({ path: path.join(__dirname, '../../../.env') })
dotenv.config({ path: path.join(__dirname, '../../.env') })

// Check environment variables
const VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL
const VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  console.error('Missing Supabase environment variables:', {
    VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY
  })
}

let win: BrowserWindow | null

async function getMacAddress() {
  try {
    const networkInterfaces = await si.networkInterfaces()
    for (const iface of networkInterfaces) {
      if (!iface.internal && iface.mac) {
        return iface.mac
      }
    }
    return null
  } catch (error) {
    console.error('Error getting MAC address:', error)
    return null
  }
}

async function getSystemInfo() {
  const cpu = await si.cpu()
  const mem = await si.mem()
  const os = await si.osInfo()
  const disk = await si.fsSize()
  const network = await si.networkInterfaces()

  return {
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
      cores: cpu.cores,
    },
    memory: {
      total: mem.total,
      free: mem.free,
      used: mem.used,
    },
    os: {
      platform: os.platform,
      distro: os.distro,
      release: os.release,
      arch: os.arch,
    },
    disk: disk.map(d => ({
      fs: d.fs,
      size: d.size,
      used: d.used,
      available: d.available,
    })),
    network: network.map(n => ({
      iface: n.iface,
      ip4: n.ip4,
      mac: n.mac,
    })),
  }
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, '../preload/index.js')
    }
  })

  win.webContents.on('did-finish-load', () => {
    if (!win) return;
    
    win.webContents.send('env-vars', {
      VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY
    })
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// IPC handlers
ipcMain.handle('get-system-info', getSystemInfo)
ipcMain.handle('get-device-id', getDeviceIdentifier)
ipcMain.handle('get-mac-address', getMacAddress)
