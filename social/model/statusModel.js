const Model=require('../router/model')
const { query } = require('express')
class StatusModel extends Model{
    constructor(){
        super()
        this.table="status"
    }


    statusFriend(arr){


        let query="SELECT  status.`id`,status.`text`,status.`pic_url`,status.`user_id`,user.`name`,user.`surname`,user.`age` FROM STATUS INNER JOIN USER ON status.user_id=user.id WHERE status.user_id IN"


        return new Promise((ok,errors)=>{
            this.connect.query(query+`(${arr})`, (error,data)=>{
                
                ok(data  )
                         })
                     })
    }
     

}

module.exports=new StatusModel