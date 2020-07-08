const expres = require('express')
const app= expres()
const bodyParser=require('body-parser')
const session=require('express-session')
const router=require('./router')
const ChatModel = require('./model/ChatModel')
const UserModel = require('./model/UserModel')
const server=require('http').Server(app)
const io =require('socket.io')(server)

app.use(
    session({
        secret:'keybord cat',
        resave:false,
        saveUninitialized:true,
    })
)
app.set('view engine', 'ejs')
app.set('views', 'page')
app.use(expres.static('public'))
app.use(bodyParser.urlencoded({
    extended:false
}))

app.use(bodyParser.json())
app.use(router)


io.on('connection',(socket)=>{

    socket.on('/myChat', async (data)=>{
         socket.join(data.myid1)
        let me= await UserModel.find({id:data.myid1})
        me=me[0]
        let friend=await UserModel.find({id:data.friendid1})
        friend=friend[0]
 const arr= await ChatModel.findById(data.friendid1,data.myid1)

  socket.emit('/mess',{arr,me,friend})
     
     })

     socket.on('addMessige',async (data)=>{
         
         let x= await ChatModel.insert({from_id:data.myid1,to_id:data.friendid1,text:data.text})
       
let z=await ChatModel.find({id:x})
let me= await UserModel.find({id:data.myid1})
me=me[0]
let friend=await UserModel.find({id:data.friendid1})
friend=friend[0]

if(z[0].text.length>0){

 socket.broadcast.to(data.friendid1).emit('/newMesss',{msg:z[0]})   
  socket.emit('/newMesss',{msg:z[0]})  
}


     })
 

    
})



server.listen(3030)