const bcrypt=require('bcrypt')
const tiv=10
const UserModel= require('../model/UserModel')
const {check, validationResult} = require('express-validator')

class RegisterControler{
constructor(){

}

async login(req,res){
    const error =validationResult(req)
    const err=error.errors
    
    if(!error.isEmpty()){
       
const inputValue=req.body
req.session.inputValue=inputValue
req.session.validationError=error.errors

res.redirect('/signin')
   
    }else{
        var user=await UserModel.find({email:req.body.email})

   req.session.userId=user[0].id
   req.session.email=user[0].email
       
        res.redirect(`/profile`)
    }
    
}
 

async register(req,res){
    const error =validationResult(req)
    const err=error.errors
    
    if(!error.isEmpty()){
     
const inputValue=req.body
req.session.inputValue=inputValue
req.session.validationError=error.errors

res.redirect('/signup')
       // return res.status(422).jsonp(error.array())
    }else{
        const esh=bcrypt.hashSync(req.body.password,tiv)
        const obj={name:req.body.name,
            surname:req.body.surname,
            age:req.body.age,
        email:req.body.email,
      password:esh}
 await UserModel.insert(obj)
        res.redirect('/signin')
    }
    
}

signUp(req,res){
    
    var value={};
    var errors={}
    if(req.session.validationError && req.session.inputValue){
        value=req.session.inputValue
        req.session.validationError.forEach(e=>{
            if(errors[e.param]==undefined){
                errors[e.param]=e.msg
            }
        })
    }  
   

    req.session.destroy()
    res.render('signup',{val:value, err:errors})
}

signIn(req,res){
    var value={};
    var errors={}
    if(req.session.validationError && req.session.inputValue){
        value=req.session.inputValue
        req.session.validationError.forEach(e=>{
            if(errors[e.param]==undefined){
                errors[e.param]=e.msg
            }
        })
    }   
    if(req.session.userId!=undefined){
        UserModel.update({onlaine:0},req.session.userId)
    }
 
    req.session.destroy()
    res.render('signin',{val:value, err:errors})
}



}

module.exports= new RegisterControler