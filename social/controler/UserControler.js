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





class UserControler{

    async profile(req,res){
        var value={};
        var errors={}
        if(req.session.validationError && req.session.inputValue){
            req.session.validationError.forEach(e=>{
                if(errors[e.param]==undefined){
                    errors[e.param]=e.msg
                 }
            })
        } 
        if(req.session.userId){
            await UserModel.update({onlaine:1},req.session.userId)
        var set=req.session.setting
            var user= await UserModel.find({id:req.session.userId})
            const userArr =await FriendModel.find(req.session.userId)
            let arr =[ req.session.userId]
            for(let k in userArr){    
                  if(userArr[k].from_id == req.session.userId){
                               arr.push(userArr[k].to_id) 
                                 }else if(userArr[k].to_id == req.session.userId) {    
                               arr.push(userArr[k].from_id)
                                  }
                                  }

                            
   let arrR= await statusModel.statusFriend(arr.toString()) 
for(let i in arrR){
    arrR[i].like= await StatusLikeModel.find({status_id:arrR[i].id})

for(let g in arrR[i].like){
    if(arrR[i].like[g].user_id==req.session.userId){
        arrR[i].liked=true
    }
}

    let us=await UserModel.find({id:arrR[i].user_id})
    let com=await StatusComentModel.find({status_id:arrR[i].id})
    
    arrR[i].userful=us[0]
    arrR[i].coment=com
  
}
let requests= await RequestModel.findRequests(req.session.userId)
for(let r in requests){
    
    if(requests[r].to_id==req.session.userId){
        let rr= await UserModel.find({id:requests[r].from_id})
        requests[r].user=rr[0]
        requests[r].status='toRequest'
    }else  if(requests[r].from_id==req.session.userId){
        let uu= await UserModel.find({id:requests[r].to_id})
        
        requests[r].status='fromRequest'
        requests[r].user= uu[0]
       
    }

}
arrR=arrR.reverse()

let  arr1= await  FriendModel.findFriend(req.session.userId)
let users1=[]
for(let z in arr1){
let use=await UserModel.find({id:arr1[z].to_id})
users1.push(use[0])
}




           res.render('profile',
           {user:user[0],
            set:set,
            val:value, 
            err:errors,active:' active',
            statuss:arrR,
          requests:requests,
          friends:users1  })
        }else{
            res.redirect('/signin')
        }
    
    }


      addPicture(req,res){
        if(req.file!=undefined){
            req.session.setting=false
        let image='image/'+req.file.filename
        UserModel.uploadImage(image,req.session.userId)
        }
           res.redirect('/profile')

    }

    addLotPic(req,res){
        if(req.file!=undefined){
       let image='image/'+req.file.filename
        ImageModel.uploadImage(req.session.userId,image)
        } 
       res.redirect("/myPictures")   
    }

    
   async showPictres (req,res){
        if(req.session.userId){
            var user= await UserModel.find({id:req.session.userId})
            var image= await ImageModel.findImages({user_id:req.session.userId})
           res.render('myPictures',{user:user[0],image:image,act:' active'})
        }else{ 
            res.redirect('/signin')
        }
    }
   async DeletPictureById(req,res){
let id=req.body.id
let img=req.body.img
ImageModel.deletById(id)
let iduser=req.session.userId
let  user=await UserModel.find({id:iduser})
if(user[0].pic_url!=img){
  fs.unlink('public/'+img,function(err){
    if(err)throw err
    console.log('file deleted')
})  
}
 
res.send('ok')
    } 
    
async ProfilePictureById(req,res){
        let id=req.session.userId
        let img=req.body.img 
       var delet= await UserModel.find({id:id})
      await UserModel.uploadImage(img,id)
     let nodelet= await ImageModel.find({user_id:id})
     var bool=true
      
      nodelet.forEach(e=>{ 
          if(delet[0].pic_url==e.pic_url){
              bool=false
          }
      }) 
                if(delet[0].pic_url!='image/nk2.png'&& bool==true){
                fs.unlink('public/'+delet[0].pic_url,function(err){
            if(err)throw err
        })    
      } 
        res.send('ok')
            } 
     

  async updateProfil(req,res){
                const error =validationResult(req)
            error.errors.forEach((a,b)=>{
                if(a.value==req.session.email&&a.msg=='tvial emaily goutun uni'){
                    error.errors.splice(b,1)
                }
            })
                if(!error.isEmpty()){
            const inputValue=req.body
            req.session.inputValue=inputValue
            req.session.validationError=error.errors
            res.redirect('/profile')
                  
                }else{
                    let id=req.session.userId
                    const esh=bcrypt.hashSync(req.body.password,tiv)
                    const obj={name:req.body.name,
                        surname:req.body.surname,
                        age:req.body.age,
                    email:req.body.email,
                  password:esh}
                   req.session.validationError=''
                   req.session.setting=false
             await UserModel.update(obj,id)
                    res.redirect('/profile')
                }
                
            }


async search(req,res){
let value=req.body.val
let arr= await UserModel.search(value)
for(let i in arr){
    let valueR=await RequestModel.findById(arr[i].id,req.session.userId)
    let valuef=await FriendModel.findById(arr[i].id,req.session.userId)
    
    if(valuef.length==0){
        arr[i].status='not friend'
    }else{
        arr[i].status= 'friend'
    }
    if(valueR.length!=0){
        if(valueR[0].from_id==arr[i].id){
            arr[i].status='toRequest'
        }else if(valueR[0].to_id==arr[i].id){
            arr[i].status='fromRequst'
        }
    }
     
    if(arr[i].id==req.session.userId){
        arr[i].status='i'
    }
    
    }
res.send(arr)
}


async guest(req,res){
    if(req.session.userId){
    let email=req.params.x
let guestuser= await UserModel.find({email:email})

var user= await UserModel.find({id:req.session.userId})
 let valuef=await FriendModel.findById(req.session.userId,guestuser[0].id)
 let valueR=await RequestModel.findById(req.session.userId,guestuser[0].id)

 if(valuef.length==0){
    guestuser[0].status='not friend'
}else{
    guestuser[0].status= 'friend'
}  
if(valueR.length!=0){
    if(valueR[0].from_id== guestuser[0].id){
        guestuser[0].status='toRequest' 
    }else if(valueR[0].to_id==guestuser[0].id){
        guestuser[0].status='fromRequst'
    }
}

let arrR= await statusModel.statusFriend(guestuser[0].id) 
for(let h in arrR){
    arrR[h].like= await StatusLikeModel.find({status_id:arrR[h].id})
    let us=await UserModel.find({id:arrR[h].user_id})
    let com=await StatusComentModel.find({status_id:arrR[h].id})
    arrR[h].userful=us[0]
    arrR[h].coment=com
    for(let g in arrR[h].like){
        if(arrR[h].like[g].user_id==req.session.userId){
            arrR[h].liked=true
        }
    }
  
} 
let image= await ImageModel.findImages({user_id:guestuser[0].id})
       res.render('guest',  {guest:guestuser[0],user:user[0],statuss:arrR,image:image })
    }else{
        res.redirect('/signin')
    }

} 




 
}

module.exports=new UserControler