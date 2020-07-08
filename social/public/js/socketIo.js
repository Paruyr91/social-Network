










const socket=io.connect('http://localhost:3030')
console.log(socket)
let addchat=document.querySelectorAll(".addchat")
addchat.forEach(e=>{
e.addEventListener('click',AddChat)
})
let friendid1
let myid1 ,me1 ,friend1

function AddChat(){
   friendid1=this.dataset.id
let profileimg=document.getElementById('profile-img')
   myid1=profileimg.dataset.id
   show.style='display:block'
   
  
   socket.emit('/myChat',{friendid1,myid1})
    console.log('data.arr')
   socket.on('/mess',  (data)=>{
       console.log(data.arr)
       me1=data.me
       friend1=data.friend
 let messul=document.getElementById('messul')
 messul.innerHTML=''
 for(let k in data.arr){

          let li=document.createElement('li')
      let img=document.createElement('img')    
      if(data.arr[k].to_id==myid1){
         li.className='sent'
        img.src=data.friend.pic_url
      }else if(data.arr[k].from_id==myid1 ){
         li.className='replies'
      img.src=data.me.pic_url
      }


let p=document.createElement('p')
      p.innerHTML=data.arr[k].text
li.appendChild(img)
li.appendChild(p)
messul.appendChild(li)
 }

   })
  
  



}



let iid=document.getElementById('sbmitmess')
iid.addEventListener('click',function(){
    let text=mestext.value
  
    socket.emit('addMessige',{text,friendid1,myid1})
    mestext.value=''
   
 return false
})


socket.on('/newMesss', (data)=>{

   let messul=document.getElementById('messul')


     let li=document.createElement('li')
 let img=document.createElement('img')    
 if(data.msg.to_id==myid1){
li.className='sent'
 img.src=friend1.pic_url
 }else if(data.msg.from_id==myid1 ){
      li.className='replies'
     img.src=me1.pic_url
 }
let p=document.createElement('p')
 p.innerHTML=data.msg.text
li.appendChild(img)
li.appendChild(p)
messul.appendChild(li)

})