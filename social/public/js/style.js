
let deletpicture=document.querySelectorAll('.delet')

deletpicture.forEach(e=>{
  e.addEventListener('click', DeletPictureById)
})

function  DeletPictureById(){
  let id=this.parentElement.dataset.id
  let img=this.dataset.id
  axios.post('/DeletPictureById',{id,img})
  .then((data)=>{
this.parentElement.parentElement.remove()
  }).catch((e)=>{})
} 

let profilPicture=document.querySelectorAll('.profilePicture')

profilPicture.forEach(e=>{
  e.addEventListener('click',ProfilPictureById)
})

function ProfilPictureById(){
  let id=this.parentElement.dataset.id
  let img=this.dataset.id
  axios.post('/ProfilePictureById',{id,img})
  .then((data)=>{

  }).catch((e)=>{})
}