const {app, BrowserWindow} = require('electron');

const url = require('url');
const path = require('path');



function Createwindow(){
    const mainwindow = new BrowserWindow({
        title:'DEVSYNC',
        width:1000,
        height:600
    });

    const starturl = url.format({

        pathname : path.join(__dirname,'Devsync_frontend/index.html'),
        protocol: 'file'

    });

    mainwindow.loadURL('http://localhost:5173/');

    mainwindow.webContents.openDevTools();
}

app.whenReady().then(Createwindow);