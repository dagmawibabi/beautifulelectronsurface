const {app, BrowserWindow} = require("electron");

function createMainWindow(){
    let mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        frame: false,
        fullscreen: true
    })
    mainWindow.loadURL("File://"+__dirname+"/Src/Boot.html");
    //mainWindow.webContents.openDevTools();
}

app.on("ready",createMainWindow);


