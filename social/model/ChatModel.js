const Model=require('../router/model')
class ChatModel extends Model{
    constructor(){
        super()
        this.table="chat"
    }

    findById(id,myId){
        return new Promise((ok,error)=>{
            this.connect.query(`select * from chat where from_id=${id}
            and to_id=${myId} or from_id=${myId} and to_id=${id} `,(error,data)=>{
               
                ok(data  ) 
                         })
        })
}


insert(obj){
    let keys= Object.keys(obj)
    keys=(keys.join(','))
    let value=Object.values(obj)
    value=(value.join('","'))

    return new Promise((ok,error)=>{
         this.connect.query(`insert into ${this.table}(${keys}) values ("${value}")`, (error, data)=>{

            ok(data.insertId) 
                     })
            })


         }
              

                }



module.exports=new ChatModel