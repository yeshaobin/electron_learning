const fs = require('fs')
let holder = document.querySelector('#holder')
console.log(holder);
holder.addEventListener('drop',(e)=>{
  console.log(e)
  e.preventDefault() //取消默认
  e.stopPropagation() //阻止冒泡
  for(const file of e.dataTransfer.files){
    console.log(file)
    console.log('路径',file.path)
    fs.readFile(file.path,(err,data)=>{
      let list = document.querySelector('#readList')
      if(err){
        console.log(err)
        return
      }else{
        list.innerHTML += `
        <h3>${file.name}</h3>
        <pre>${data.toString('utf-8')}</pre>
        `
      }

    })
  }
})
holder.addEventListener('dragover',(e)=>{
  e.preventDefault() //取消默认
  e.stopPropagation() //阻止冒泡
})