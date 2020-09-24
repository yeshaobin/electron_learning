const fs = require('fs')
console.log(fs)
console.log('render.js')
fs.writeFile('input.txt','将Hello world写入input.txt',(err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('写入完毕');
  }
})
let btn = document.querySelector('button')
let i=0;
btn.onclick=function(){
  fs.writeFile('input.txt',`写入第${i}次`,{flag:'a'},(err)=>{
    if(err){
      console.log(err);
    }else{
      console.log('写入完毕');
      i++;
    }
  })
}