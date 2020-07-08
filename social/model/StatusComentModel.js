const Model=require('../router/model')
class StatusComentModel extends Model{
    constructor(){
        super()
        this.table="statuscoment"
    }

    statusComent(id){


        return new Promise((ok,errors)=>{
            this.connect.query(`SELECT statuscoment.id, statuscoment.user_id, statuscoment.status_id, statuscoment.text, statuscoment.timesetmp, user.name, user.surname, user.age, user.pic_url FROM statuscoment INNER JOIN USER ON statuscoment.user_id=user.id WHERE statuscoment.status_id=${id}`, (error,data)=>{
                
                ok(data  )
                         })
                     })
    }
     


}

module.exports=new StatusComentModel