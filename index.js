const { app, BrowserWindow } = require('electron');
const server = require('./server/app.js');
const sudo = require('sudo-prompt');
const path = require('path');
var options = {
  name: 'NetCap',
  icns: path.resolve(__dirname +'/icons/14589-200.png'), // (optional)
};

const createWindow = () => {
  win = new BrowserWindow({width: 1000, height: 1000});
  win.loadURL('http://localhost:5451');
  win.webContents.openDevTools();
  sudo.exec('parse-live -o ./savedData/data.txt', options, function(error1, stdout1, stderr1) {
    if(error1 || stdout1 || stderr1) {
          sudo.exec('parse-live -o ./savedData/data.txt', options, function(error2, stdout2, error2) {
        if(error2 || stdout2 || error2) {
          sudo.exec('parse-live -o ./savedData/data.txt', options, function(error3, stdout3, stderr3) {
            if(error3 || stdout3 || stderr3) {
              
            }
          });
        }
      });
    }
  });

  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
}


app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    server.server.close();
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});