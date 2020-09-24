const webview = document.querySelector('webview')
webview.addEventListener('did-start-loading',()=>{
  console.log('正在加载')
})
webview.addEventListener('did-stop-loading',()=>{
  console.log('加载完毕')
  webview.insertCSS(`#su{background:red!important;}`)
  
  webview.executeJavaScript(`
  let timer = window.setTimeout(()=>{
    let input = document.querySelector('#kw')
    let btn = document.querySelector('#su')
    input.value = "老陈打码"
    btn.click()
    window.clearTimeout(timer)
  },2000)
  `)
})