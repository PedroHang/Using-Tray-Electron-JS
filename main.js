const { app, BrowserWindow, Tray, Menu } = require('electron');

let myWindow = null; 

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
