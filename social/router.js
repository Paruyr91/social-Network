const expres = require('express')
const router= expres.Router()
const {check, validationResult} = require('express-validator')
const bcrypt=require('bcrypt')
const UserModel= require('./model/UserModel')
const ImageModel= require('./model/ImageModel')
const multer=require('multer')
const RegisterControler=require('./controler/RegisterControler')
const UserControler=require('./controler/UserControler')
const StatusControler = require('./controler/StatusControler')
const RequestsAndFriendsControler = require('./controler/RequestsAndFriendsControler')
const ChatControler = require('./controler/ChatControler')

let storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,'public/image')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+req.session.userId+file.originalname)
    } 
}) 

let upload=multer({storage:storage})

 
router.post('/add', (req,res)=>{
    res.redirect('/about')
   console.log(req.body.name)
   console.log(req.body.surname)
   lesson.push(req.body.name)
 
 })

 router.post('/sign',[
    check('name').notEmpty().withMessage('lracnel name').isAlpha().withMessage('grel text'),
    check('surname').notEmpty().withMessage('lracnel surname').isAlpha().withMessage('grel text'),
check('age').notEmpty().withMessage('lracnel Age').isNumeric().withMessage('grel tiv'),
check('email').notEmpty().withMessage('lracnel emaiil').isEmail().withMessage('grel mail').
custom(async value=>{
var user=await UserModel.find({email:value})

    if(user.length!=0){
        return Promise.reject()
    }
}).withMessage('tvial emaily goutun uni'),
check('password').notEmpty().withMessage('lracnel Password').isLength({min:5}).withMessage('length 5'),
check('conpassword').notEmpty().withMessage('lracnel con pasword-dashty').custom((value,{req})=>(value===req.body.password)).withMessage('chen hamnknum passwordnery')

], RegisterControler.register)

router.post('/sigin',[
check('email').notEmpty().withMessage('lracnel emaiil').isEmail().withMessage('grel mail').
custom(async (value,{req})=>{
    var user= await   UserModel.find({email:value})
       
        if(user.length==0){
            req.session.inputValue={email:value}
            return Promise.reject()
        }else{
            if(!bcrypt.compareSync(req.body.password,user[0].password)){
                return Promise.reject()
            }
        }
    }).withMessage('tvial emaily sxal e'),
check('password').notEmpty().withMessage('lracnel Password').isLength({min:5}).withMessage('length 5'),

], RegisterControler.login)

router.get('/',(req,res)=>{
    res.redirect('signin')
})
router.get('/profile', UserControler.profile)
router.get('/signup',RegisterControler.signUp)
router.get('/signin',RegisterControler.signIn)
router.get('/status',StatusControler.myStatus)
router.get('/alluser',RequestsAndFriendsControler.allUser)
router.get('/guest/:x',UserControler.guest)
router.get('/myPictures',UserControler.showPictres)
router.get('/chat',ChatControler.chat)


router.post('/addPicture',upload.single('image'), UserControler.addPicture )
router.post('/updateProfil',[
    check('name').notEmpty().withMessage('lracnel name').isAlpha().withMessage('grel text'),
    check('surname').notEmpty().withMessage('lracnel surname').isAlpha().withMessage('grel text'),
check('age').notEmpty().withMessage('lracnel Age').isNumeric().withMessage('grel tiv'),
check('email').notEmpty().withMessage('lracnel emaiil').isEmail().withMessage('grel mail').
custom(async value=>{
var user=await UserModel.find({email:value})

    if(user.length!=0){
        return Promise.reject()
    }
}).withMessage('tvial emaily goutun uni'),
check('password').notEmpty().withMessage('lracnel Password').isLength({min:5}).withMessage('length 5'),
check('conpassword').notEmpty().withMessage('lracnel con pasword-dashty').custom((value,{req})=>(value===req.body.password)).withMessage('chen hamnknum passwordnery')

], UserControler.updateProfil)

router.post('/deletPhoto', (req,res)=>{
    res.redirect('/about')
 })
 router.post('/openSetings', (req,res)=>{
    req.session.setting=true  
    res.redirect('/profile')
 })

router.post('/addLotPic',upload.single('image'), UserControler.addLotPic )
 router.post('/DeletPictureById',UserControler.DeletPictureById)
 router.post('/ProfilePictureById',UserControler.ProfilePictureById)
 router.post('/addStatus',upload.single('image'),StatusControler.addStatus)
router.post('/addFriendRequest',RequestsAndFriendsControler.addFriendRequest)
router.post('/deletFriend',RequestsAndFriendsControler.deletFriend)
router.post('/aceptFriend',RequestsAndFriendsControler.aceptFriend)
router.post('/deletRequeset',RequestsAndFriendsControler.deletRequeset)
router.post('/deletStatus',StatusControler.deletStatus)
router.post('/likeStatus',StatusControler.likeStatus)
router.post('/comentStatus',StatusControler.comentStatus)
router.post('/search',UserControler.search)
router.post('/addComent',StatusControler.addComent)
router.post('/deletComent',StatusControler.deletComent)



 module.exports=router