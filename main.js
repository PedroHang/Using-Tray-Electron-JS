const { app, BrowserWindow, Tray, Menu } = require('electron');
const inspector = require('inspector');
const fs = require('fs');
const session = new inspector.Session();

session.connect();

let myWindow = null; 



session.post('Profiler.enable', () => {
    session.post('Profiler.start', () => {
      
        app.whenReady().then(() => {
            myWindow = new BrowserWindow({
                width: 800,
                height: 600,
                webPreferences: {
                    nodeIntegration: true
                }
            });
        
            myWindow.loadFile('index.html');
        
            const tray = new Tray('assets/iconn.png');
        
            const contextMenu = Menu.buildFromTemplate([
                { label: 'My Drive', click: createSmallWindow },
                { label: 'Preferences', click: createSmallWindow },
                { label: 'Quit', role: 'quit' } 
            ]);
            tray.setToolTip('MY DRIVE');
            tray.setContextMenu(contextMenu);
        
            tray.on('click', createSmallWindow); 
        });
        
        function createSmallWindow() {
            const smallWindow = new BrowserWindow({
                width: 400,
                height: 300,
                webPreferences: {
                    nodeIntegration: true
                }
            });
        
            smallWindow.loadFile('small.html');
        }
  
      // some time later...
      session.post('Profiler.stop', (err, { profile }) => {
        // Write profile to disk, upload, etc.
        if (!err) {
          fs.writeFileSync('./profile.cpuprofile', JSON.stringify(profile));
        }
      });
    });
  });
