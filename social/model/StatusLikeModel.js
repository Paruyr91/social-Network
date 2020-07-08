const Model=require('../router/model')
class StatusLikeModel extends Model{
    constructor(){
        super()
        this.table="statuslike"
    }


like(id,status_id){


    return new Promise((ok,errors)=>{
        this.connect.query(`call addLike(${id},${status_id})`, (error,data)=>{
            
            ok(data  )
                     })
                 })
}
     

}

module.exports=new StatusLikeModel