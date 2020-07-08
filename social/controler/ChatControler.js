
const expres = require('express')
const app= expres()
const bodyParser=require('body-parser')
const {check, validationResult} = require('express-validator')
const session=require('express-session')
const bcrypt=require('bcrypt')
const tiv=10
const UserModel= require('../model/UserModel')
const ImageModel = require('../model/ImageModel')
const fs=require('fs')
const statusModel = require('../model/statusModel')
const StatusLikeModel = require('../model/StatusLikeModel')
const RequestModel = require('../model/RequestModel')
const FriendModel = require('../model/FriendModel')
const StatusComentModel = require('../model/StatusComentModel')





class ChatControler{

    async chat(req,res){

        if(req.session.userId){
            let  arr= await  FriendModel.findFriend(req.session.userId)
            let users=[]
          for(let i in arr){
          let use=await UserModel.find({id:arr[i].to_id})
          users.push(use[0])
          }
     
            var user= await UserModel.find({id:req.session.userId})
           

           res.render('chat', {user:user[0],friends:users})
        }else{
            res.redirect('/signin')
        }
    
    }



    
 
}

module.exports=new ChatControler