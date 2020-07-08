
let searchinppp=document.getElementById('search')


searchinppp.addEventListener('input',Search)

function Search(){
    let val =this.value
    let box=document.getElementsByClassName('serchrezults')
if(val.length!=''){


    axios.post('/search',{val}).then(data=>{

box[0].innerHTML=''
let result=data.data
      
   


for(let i=0;i< result.length;i++) {
 
let card=document.createElement('div')
card.className='serchcard'

let img=document.createElement('img')
img.className='guestimg'
img.src=result[i].pic_url
let a=document.createElement('a')
a.innerHTML=result[i].name+' '+result[i].surname

a.href = "/guest/"+result[i].email
a.style='color:black'

 if(result[i].status=='i'){
  a.href='/profile'
continue
}
card.append(img)
card.append(a)


console.log(result[i].status)


if(result[i].status=='friend'){
  var p=document.createElement('p')
  p.className='serchp'
  p.dataset.id=result[i].id
  var btn=document.createElement('button')
  btn.className="deletFriend buttons"
  btn.innerHTML="Delet"
  p.className='serchp'
  
  let btnme=document.createElement('button') 
  btnme.className="buttons"
  btnme.innerHTML="Massege"
  p.append(btnme)
  btn.addEventListener('click',DeletFeiend)
  p.append(btn)
  card.append(p)

}else if(result[i].status=='not friend'){

  var btn=document.createElement('button')
btn.className="addFriend buttons"
btn.innerHTML="Add Friend+"
btn.addEventListener('click',AddFriendRequest)
var p =document.createElement('p')
p.className='serchp'
p.dataset.id=result[i].id
p.append(btn)
card.append(p)
}else if(result[i].status=='fromRequst'){

  var p =document.createElement('p')
  p.className='buttons'
  p.innerHTML='you send Request'
  p.dataset.id=result[i].id
  card.append(p)
}else if(result[i].status=='toRequest'){

  var p =document.createElement('p')
  var btn=document.createElement('button')
  var btnd=document.createElement('button')
  btnd.className="deletRequest buttons"
  btn.className="aceptFriend buttons"
  btn.innerHTML="Acept"
  btnd.innerHTML="Delet"

  p.className='serchp'
  btnd.addEventListener('click',DeletRequeset)
 btn.addEventListener('click',AceptFeiend)
 p.dataset.id=result[i].id
  p.append(btn)
  p.append(btnd)
  card.append(p)
}else if(result[i].status=='i'){
  card.append("me")
}

box[0].append(card)
console.log(card)
} 


            }).catch(error=>{
        
            })

            
}else{

  box[0].innerHTML=''
}

}


