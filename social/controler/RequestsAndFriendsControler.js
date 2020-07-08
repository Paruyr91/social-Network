const UserModel = require("../model/UserModel")
const RequestModel = require("../model/RequestModel")
const FriendModel = require("../model/FriendModel")




class RequestsAndFriendsControler{
    constructor(){
    
    }
 

 async allUser(req,res){
    if(req.session.userId){
  let  arr= await  FriendModel.findFriend(req.session.userId)
  let users=[]
for(let i in arr){
let use=await UserModel.find({id:arr[i].to_id})
users.push(use[0])
}
 var user= await UserModel.find({id:req.session.userId})
  res.render('alluser',{usersarr:users,user:user[0]})
}else{
    res.redirect('/signin')
}

} 



 

addFriendRequest(req,res){
let id=req.body.id
RequestModel.insert({from_id:req.session.userId,to_id:id})
res.send('ok')
}



deletFriend(req,res){
     
let frindid=req.body.id

FriendModel.deletFriendById(req.session.userId,frindid)
res.send('ok')
}



aceptFriend(req,res){
     
    let frindid=req.body.id
    
    RequestModel.deletRequest(req.session.userId,frindid)
    FriendModel.aceptFriend(req.session.userId,frindid)
    res.send('ok')
    }


    deletRequeset(req,res){
     
        let frindid=req.body.id
        
        RequestModel.deletRequest(req.session.userId,frindid)
        
        res.send('ok')
        }
}



module.exports= new RequestsAndFriendsControler