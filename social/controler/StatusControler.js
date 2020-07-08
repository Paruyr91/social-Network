const bcrypt=require('bcrypt')
const tiv=10
const UserModel= require('../model/UserModel')
const {check, validationResult} = require('express-validator')
const StatusModel = require('../model/statusModel')
const expres = require('express')
const app= expres()
const bodyParser=require('body-parser')
const session=require('express-session')
const ImageModel = require('../model/ImageModel')
const fs=require('fs')
const StatusLikeModel = require('../model/StatusLikeModel')
const StatusComentModel = require('../model/StatusComentModel')

class StatusControler{ 
constructor(){

}

async myStatus(req,res){

    if(req.session.userId){
       
          let arr= await StatusModel.find({user_id:req.session.userId}) 
          let user= await UserModel.find({id:req.session.userId}) 
           res.render('status',{statuss:arr,user:user[0]})
        }else{
            res.redirect('/signin')
        }

 
}

 addStatus(req,res){
let user_id=req.session.userId
let text=req.body.text
let obj={}
let b=true
try{
  let image='image/'+req.file.filename  
  obj={user_id:user_id,text:text,pic_url:image}
}catch(e){

    if(text.trim()==''){
       b=false
        }
 obj={user_id:user_id,text:text}
}


if(b){
StatusModel.insert(obj)
}

res.redirect('/status')

 }


 deletStatus(req,res){
    let id=req.body.id
    let image=req.body.image
  
   StatusModel.deletById(id)
   if(image!=''){
       console.log('lll')
    fs.unlink('public/'+image,function(err){
      if(err)throw err
      console.log('file deleted')
  })   
  } 
    res.send('ok')
    }
    

async likeStatus(req,res){
  let id=req.body.id
  let statusid=req.body.statusid

 await StatusLikeModel.like(id,statusid)

 let like= await StatusLikeModel.find({status_id:statusid})

  res.send(like)
  }
  async comentStatus(req,res){
    let statusid=req.body.statusid
    let user_id=req.session.userId
   let coments= await StatusComentModel.statusComent(statusid)
coments.user_id=user_id
    res.send(coments)
    }


    async addComent(req,res){
      let id=req.body.id
      let statusid=req.body.statusid
      let coment=req.body.coment
     let newcom= await StatusComentModel.insert({user_id:id,status_id:statusid,text:coment})
     let user= await UserModel.find({id:req.session.userId}) 
      res.send({user_id:id,status_id:statusid,text:coment,comuser:user[0]})
      }
    
     
      async comentStatus(req,res){
        let statusid=req.body.statusid
      
       let coments= await StatusComentModel.statusComent(statusid)
    
    for (let l in coments){
      coments[l].sesid=req.session.userId
    }
        res.send(coments)
        }
      deletComent(req,res){
          let id=req.body.id
       StatusComentModel.deletById(id)
          res.send("ok")
          }
  


}

module.exports= new StatusControler