const { app, BrowserWindow, Tray, Menu } = require('electron');


let myWindow = null;



app.whenReady().then(() => {
    const tray = new Tray('assets/iconn.png');

    const contextMenu = Menu.buildFromTemplate([
        { label: 'My Drive', click: createSmallWindow },
        { label: 'Preferences', click: createSmallWindow },
        { label: 'Quit', role: 'quit' }
    ]);
    tray.setToolTip('MY DRIVE');
    tray.setContextMenu(contextMenu);

    tray.on('click', createSmallWindow);          


      // Profiler: 33,2mb somente o ícone na tray (memória)



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




