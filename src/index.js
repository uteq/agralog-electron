const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        icon: __dirname + './assets/icons/icon.icns',
    });

    mainWindow.loadURL('https://agralog.nl/launcher');
};

app.setAboutPanelOptions({
    applicationName: 'Agralog',
    copyright: '©Uteq',
    applicationVersion: '1.0.0',
    iconPath: __dirname + './assets/icons/',
});

app.whenReady().then(() => {
    createWindow();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});