import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import Store from 'electron-store';
import { Howl } from 'howler';

const store = new Store();
let mainWindow: BrowserWindow | null = null;
let audioPlayer: Howl | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Device registration and authentication
ipcMain.handle('register-device', async (event, deviceInfo) => {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.VITE_SUPABASE_ANON_KEY!
  );

  try {
    const { data, error } = await supabase
      .from('offline_players')
      .insert([{
        device_id: deviceInfo.id,
        sync_status: 'pending',
        settings: {
          autoSync: true,
          syncInterval: 30,
          maxStorageSize: 1024 * 1024 * 1024 // 1GB default
        }
      }])
      .select()
      .single();

    if (error) throw error;
    store.set('deviceId', data.id);
    return data;
  } catch (error) {
    console.error('Error registering device:', error);
    throw error;
  }
});

ipcMain.handle('get-device-id', () => {
  return store.get('deviceId');
});

// Audio playback handlers
ipcMain.handle('play-audio', async (event, url) => {
  try {
    if (audioPlayer) {
      audioPlayer.unload();
    }

    audioPlayer = new Howl({
      src: [url],
      html5: true,
      onplay: () => {
        mainWindow?.webContents.send('playback-status', { 
          status: 'playing', 
          currentTime: audioPlayer?.seek() || 0 
        });
      },
      onpause: () => {
        mainWindow?.webContents.send('playback-status', { 
          status: 'paused',
          currentTime: audioPlayer?.seek() || 0 
        });
      },
      onend: () => {
        mainWindow?.webContents.send('playback-status', { 
          status: 'ended',
          currentTime: 0 
        });
      },
      onloaderror: (id, error) => {
        console.error('Audio loading error:', error);
        mainWindow?.webContents.send('playback-status', { 
          status: 'error',
          error: 'Failed to load audio file' 
        });
      }
    });

    audioPlayer.play();
  } catch (error) {
    console.error('Error playing audio:', error);
    throw error;
  }
});

ipcMain.handle('pause-audio', () => {
  audioPlayer?.pause();
});

ipcMain.handle('stop-audio', () => {
  audioPlayer?.stop();
});

ipcMain.handle('set-volume', (event, volume) => {
  if (audioPlayer) {
    audioPlayer.volume(volume);
  }
});

ipcMain.handle('get-current-time', () => {
  return audioPlayer ? audioPlayer.seek() : 0;
});

ipcMain.handle('set-current-time', (event, time) => {
  if (audioPlayer) {
    audioPlayer.seek(time);
  }
});
