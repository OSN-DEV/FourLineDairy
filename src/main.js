const { app, Menu, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
const url = require('url')
const AppData = require('./appdata')
const DiaryOp = require('./diary-op')
let mainWindow
var rootDir


// #################################################################
// private function
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 400, height: 400,
        resizable:false, 
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: `${__dirname}/preload.js`
        }
    })
    mainWindow.loadURL(`file://${__dirname}/diary-main.html`)
    Menu.setApplicationMenu(null);

    // for debug
    // mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

// #################################################################
// event
app.whenReady().then(() => {
    createWindow()
    rootDir = new AppData().getRoot()
    console.log(`rootDir: ${rootDir}`)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})


// #################################################################
// Message
ipcMain.handle("r2m:search-diary", (event, date) => {
    console.log("r2m:search-diary")
    return new DiaryOp().getData(rootDir, date)
})

ipcMain.handle("r2m:save-diary", (event, data) => {
    console.log("r2m:save-diary")
    new DiaryOp().saveDiary(rootDir, data)
    return true
})

ipcMain.handle("r2m:select-root", (event, date) => {
    console.log("r2m:select-root")

    dialog.showOpenDialog(null, {
        properties: ['openDirectory'],
        title: 'フォルダ(単独選択)',
        defaultPath: rootDir
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        if (!result.canceled) {
            new AppData().setRoot(result.filePaths[0])
            mainWindow.webContents.send("m2r:show-diary", result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err)
    })
})
