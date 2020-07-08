const Model=require('../router/model')
class UserModel extends Model{
    constructor(){
        super()
        this.table="user"
    }

    uploadImage(image,id){
       
        this.connect.query(`UPDATE ${this.table} set pic_url='${image}' WHERE id=${id}`,(error,data)=>{
            if(error) throw error
        
        }) 
          }


          search(value){
         let query='select * from user where '
         value=value.split(' ')

         value.forEach(e => {
             query+=`(name like '%${e}%' or surname like '%${e}%') and`
         })

query=query.substring(0,query.length-4)

return new Promise((ok,errors)=>{
    this.connect.query(query, (error,data)=>{
        if(error)throw error
        ok(data  ) 
                 })
             })

          } 
}

module.exports=new UserModel