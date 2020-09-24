const { app, BrowserWindow,dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.on('close',(e)=>{
    e.preventDefault()
    dialog.showMessageBox(mainWindow,{
      type:'warning',
      title:'关闭',
      message:'是否关闭窗口',
      buttons:['取消','残酷关闭'] 
    }).then(index=>{
      console.log(index)
      if(index.response==1){
        app.exit()
      }
    })
    
  })
  setTimeout(()=>{
    dialog.showOpenDialog({
      /**
       * openFile 允许选择文件
       * openDirectory 允许选择文件夹
       * multiSelection 允许多选
       * showHiddenFiles 显示隐藏文件
       * createDirectory 允许创建文件夹
       */
      properties:['openFile','multiSelections']
    }).then(res=>{
      console.log("result filePath", res.filePaths);
      console.log('result cancel',res.canceled)
    })
  },2000)
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
