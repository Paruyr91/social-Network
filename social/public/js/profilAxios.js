var deletStatus=document.querySelectorAll('.delbtn')
var newbtn=[]


deletStatus.forEach(e=>{
    e.addEventListener('click',DeletStatus)
})


function DeletStatus(){
    var image=this.parentElement.dataset.id
    var id=this.dataset.id
    axios.post('/deletStatus',{id,image}).then(data=>{



this.parentElement.remove()

    }).catch(error=>{

    })



}



var likestatus=document.querySelectorAll('.likebtn')

likestatus.forEach(e=>{
    e.addEventListener('click',LikeStatus)
})


function LikeStatus(){
    var statusid=this.dataset.id
    var id=this.parentElement.dataset.id
    
    axios.post('/likeStatus',{id,statusid}).then(data=>{
        let liked=false
        for(let l in data.data){
            if(data.data[l].user_id==id){
              liked=true
            }
          }
          if(liked==true){
              this.children[0].children[2].style='fill:#8146a5a6'
            this.style='background-color:rgba(102, 102, 231, 0.274);'
          }else{
              this.style='background-color: whaite;'
              this.children[0].children[2].style='fill:#ffffff' 
          }
      this.parentElement.children[1].innerHTML=data.data.length
    
    }).catch(error=>{

    })



}

var comenttatus=document.querySelectorAll('.comentstatus')

comenttatus.forEach(e=>{
    e.addEventListener('click',ComentStatus)
    
})



function ComentStatus(){
   let div=document.createElement("div")
   div.className = "comentcontainer";
   var statusid=this.parentElement.children[0].children[0].dataset.id 
   
   var addcoment=document.createElement("div")

   var textinp=document.createElement("textarea")
   var sbmit=document.createElement("button")
   sbmit.innerHTML="add"
   sbmit.className="btn btn-outline-primary addComent"
   textinp.className="textinput"
   textinp.placeholder='enter coment'
  addcoment.className="comentdiv"
   sbmit.addEventListener('click',AddComent)

   addcoment.appendChild(textinp)
   addcoment.appendChild(sbmit)

   div.appendChild(addcoment)

   axios.post('/comentStatus',{statusid}).then(data=>{


let com=data.data.reverse()

       for(let j=0;j<com.length;j++ ){
        let divid=document.createElement("div")
        divid.dataset.id=com[j].id

        var d = new Date( com[j].timesetmp);
        var b = new Date();
        if(b.getFullYear()- d.getFullYear()>0){
             com[j].time=b.getFullYear()- d.getFullYear()+'years ago'
        }else if(b.getMonth()- d.getMonth()>0){
              com[j].time=b.getMonth()- d.getMonth()+'monts ago'
        }else if(b.getDate()- d.getDate()>0){
            com[j].time=b.getDate()- d.getDate()+'days ago'
      }else if(b.getHours()- d.getHours()>0){
        com[j].time=b.getHours()- d.getHours()+'hours ago'
  }else if(b.getMinutes()- d.getMinutes()>0){
    com[j].time=b.getMinutes()- d.getMinutes()+'minutes ago'
}else{
      com[j].time="just now"
}
        
divid.className='divcomentouter'

 divid.innerHTML='<div class="comentuserdiv" > <span class="comentuserspan" ><img class="comentuserimg" src="../'+com[j].pic_url+'">'+com[j].name+' '+com[j].surname+'</span></div> <div class="comenttext"><p>'+com[j].text+'</p>  <span>'+com[j].time+'</span></div></div>'
    


if(com[j].sesid==com[j].user_id){

 let delbtn=document.createElement("button")
 delbtn.dataset.id=com[j].id
 delbtn.className='deletComent '
 delbtn.innerHTML="&times;" 
 delbtn.addEventListener('click',DeletComent)
 divid.appendChild(delbtn)
}


       div.appendChild(divid)
      


       }

  }).catch(error=>{

  })
   var btn= this.parentElement.children[2]
   this.className="coment comentstatus displaybtncoment"
    btn.classList.remove("displaybtncoment")
      this.parentElement.parentElement.appendChild(div)

  
}



var endstatus=document.querySelectorAll('.endstatus')

endstatus.forEach(e=>{
    
    e.addEventListener('click',EndStatus)
    
})

function EndStatus(){
   let r= this.parentElement.parentElement.children
  this.parentElement.parentElement.children[r.length-1].remove()  


 var btn= this.parentElement.children[1]
 this.className="coment endstatus displaybtncoment"
  btn.classList.remove("displaybtncoment")
   
 }








 
 function AddComent(){
let statusid=this.parentElement.parentElement.parentElement.children[1].dataset.id
let id=this.parentElement.parentElement.parentElement.children[0].dataset.id
    let coment=this.parentElement.children[0].value
   
 if(coment!=''){


    axios.post('/addComent',{id,statusid,coment}).then(data=>{

       var div=document.createElement("div")
       
       div.innerHTML=`<div class="comentuserdiv"> <span class="comentuserspan"><img class="comentuserimg" src="../${data.data.comuser.pic_url}"> ${data.data.comuser.name}   ${data.data.comuser.surname}   </span></div> <div class="comenttext"><p>${data.data.text}</p>  <span>just now</span></div>`
this.parentElement.parentElement.children[0].after (div)
      
          this.parentElement.children[0].value =''
        
          }).catch(error=>{
        
          })
 }
  }


  function DeletComent(){
     

let id=this.dataset.id

    axios.post('/deletComent',{id}).then(data=>{

this.parentElement.remove()
         
           }).catch(error=>{
         
           })
  }