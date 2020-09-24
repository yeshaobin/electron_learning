const { app, BrowserWindow,ipcMain } = require('electron');
const path = require('path');

//监听渲染进程发送到渲染事件
ipcMain.on('lc-message',(event,arg)=>{
  console.log("event", event);
  event.reply('lc-reply','这是主进程的答复')
  console.log(Buffer.from(arg).toString('utf8'))
})
ipcMain.on('openNewWindows',(event,arg)=>{
  //准备打开新窗口
  createMyWindow('https://www.taobao.com')
  createMyWindow('https://www.baidu.com')
})


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createMyWindow = (url) => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration:true
    }
  });
  // and load the index.html of the app.
  mainWindow.loadURL(url);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      nodeIntegration:true
    }
  });
  let timer = globalThis.setTimeout(function(){
    //主动发送消息到渲染进程
    mainWindow.webContents.send('lc-active','创建窗口之后主进程主动发送消息到渲染进程')
    globalThis.clearTimeout(timer)
  },2000)
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
