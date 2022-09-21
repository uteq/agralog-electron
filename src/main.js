const {app, BrowserWindow, Menu} = require('electron');
const isMac = process.platform === 'darwin';
const fetch = require('electron-fetch').default;
let locationMenuItems = [];

const urlConfig = {
    api: 'https://agralog.nl/api/locations',
    launcher: 'https://agralog.nl/launcher',
};

const capitalize = (string) => string && string[0].toUpperCase() + string.slice(1)

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 1000,
        icon: __dirname + './assets/icons/icon.icns',
    });

    async function fetchLocations() {
        await fetch(urlConfig.api)
            .then(res => res.json())
            .then(body => Object.assign(locationMenuItems, body.map((item) => {
                    return {
                        label: capitalize(item.name),
                        click() {
                            mainWindow.loadURL(item.url);
                        }
                    }
                }))
            );
    }

    try {
        await fetchLocations();
    } catch (e) {
        console.error(e);
    }

    const template = [
        // { role: 'appMenu' }
        ...(isMac ? [{
            label: app.name,
            submenu: [
                {role: 'about'},
                {type: 'separator'},
                {role: 'services'},
                {type: 'separator'},
                {role: 'hide'},
                {role: 'hideOthers'},
                {role: 'unhide'},
                {type: 'separator'},
                {role: 'quit'}
            ]
        }] : []),
        // { role: 'locationMenu' }
        {
            label: 'Locaties',
            submenu: [
                {
                    label: 'Startscherm',
                    click() {
                        mainWindow.loadURL(urlConfig.launcher)
                    }
                },
                {type: 'separator'},
                ...locationMenuItems,
            ]
        },
        // { role: 'fileMenu' }
        {
            label: 'File',
            submenu: [
                isMac ? {role: 'close'} : {role: 'quit'}
            ]
        },
        // { role: 'editMenu' }
        {
            label: 'Edit',
            submenu: [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                ...(isMac ? [
                    {role: 'pasteAndMatchStyle'},
                    {role: 'delete'},
                    {role: 'selectAll'},
                    {type: 'separator'},
                    {
                        label: 'Speech',
                        submenu: [
                            {role: 'startSpeaking'},
                            {role: 'stopSpeaking'}
                        ]
                    }
                ] : [
                    {role: 'delete'},
                    {type: 'separator'},
                    {role: 'selectAll'}
                ])
            ]
        },
        // { role: 'viewMenu' }
        {
            label: 'View',
            submenu: [
                {role: 'reload'},
                {role: 'forceReload'},
                {role: 'toggleDevTools'},
                {type: 'separator'},
                {role: 'resetZoom'},
                {role: 'zoomIn'},
                {role: 'zoomOut'},
                {type: 'separator'},
                {role: 'togglefullscreen'}
            ]
        },
        // { role: 'windowMenu' }
        {
            label: 'Window',
            submenu: [
                {role: 'minimize'},
                {role: 'zoom'},
                ...(isMac ? [
                    {type: 'separator'},
                    {role: 'front'},
                    {type: 'separator'},
                    {role: 'window'}
                ] : [
                    {role: 'close'}
                ])
            ]
        },
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    mainWindow.loadURL(urlConfig.launcher);
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
