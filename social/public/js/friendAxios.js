

var addFriendRequest=document.querySelectorAll('.addFriend')

addFriendRequest.forEach(e=>{
    e.addEventListener('click',AddFriendRequest)
})


 function AddFriendRequest(){
     console.log(this.parentElement)
    var id=this.parentElement.dataset.id
    axios.post('/addFriendRequest',{id}).then(data=>{
var p =document.createElement('p')
p.className='button'
p.innerHTML='you send Request'
this.parentElement.append(p)


this.remove()

    }).catch(error=>{

    })



}


var addFriendRequest=document.querySelectorAll('.deletFriend')

addFriendRequest.forEach(e=>{
    e.addEventListener('click',DeletFeiend)
})


function DeletFeiend(){
    var id=this.parentElement.dataset.id
    console.log(this.parentElement)
    axios.post('/deletFriend',{id}).then(data=>{
var btn=document.createElement('button')
btn.className="addFriend button buttons"
btn.innerHTML="Add Friend+"
btn.addEventListener('click',AddFriendRequest)
this.parentElement.children[this.parentElement.children.length-2].remove()
this.parentElement.append(btn)


this.remove()

    }).catch(error=>{

    })



}



var addFriendRequest=document.querySelectorAll('.acceptFriend')

addFriendRequest.forEach(e=>{
    e.addEventListener('click',AceptFeiend)
})


function AceptFeiend(){
    console.log(this.parentElement)
    var id=this.parentElement.dataset.id
    axios.post('/aceptFriend',{id}).then(data=>{
var btn=document.createElement('button')
btn.className="deletFriend button buttons"
btn.innerHTML="Delet"


let btnme=document.createElement('button') 
btnme.className="button buttons"
btnme.innerHTML="Massege"


this.parentElement.children[1].remove()




 this.parentElement.append(btnme)
btn.addEventListener('click',DeletFeiend)
this.parentElement.append(btn)


this.remove()

    }).catch(error=>{

    })

}





var addFriendRequest=document.querySelectorAll('.deletFriend')

addFriendRequest.forEach(e=>{
    e.addEventListener('click',DeletFeiend)
})


function DeletFeiend(){
    console.log(this.parentElement)
    var id=this.parentElement.dataset.id
    axios.post('/deletFriend',{id}).then(data=>{
var btn=document.createElement('button')
btn.className="addFriend button buttons"
btn.innerHTML="Add Friend+"
btn.addEventListener('click',AddFriendRequest)
this.parentElement.children[this.parentElement.children.length-2].remove()
this.parentElement.append(btn)


this.remove()

    }).catch(error=>{

    })



}






var addFriendRequest=document.querySelectorAll('.deletRequest')

addFriendRequest.forEach(e=>{
    e.addEventListener('click',DeletRequeset)
})


function DeletRequeset(){
    var id=this.parentElement.dataset.id

    axios.post('/deletRequeset',{id}).then(data=>{

        var btn=document.createElement('button')
btn.className="addFriend button buttons"
btn.innerHTML="Add Friend+"
btn.addEventListener('click',AddFriendRequest)
this.parentElement.children[0].remove()
this.parentElement.append(btn)


this.remove()

    }).catch(error=>{

    })

}