const Model=require('../router/model')
class RequestsModel extends Model{
    constructor(){
        super()
        this.table="requests"
    }


    findById(id,myId){
        return new Promise((ok,error)=>{
            this.connect.query(`select * from requests where from_id=${id}
            and to_id=${myId} or from_id=${myId} and to_id=${id} `,(error,data)=>{
               
                ok(data  ) 
                         })
        })
} 
  

deletRequest(myid,frindid){

    this.connect.query(`DELETE FROM chat.requests WHERE from_id = '${frindid}' AND to_id='${myid}'`,(error,data)=>{
        if(error)throw error
    })
    }

    findRequests(id){
        let query=`SELECT * FROM requests  WHERE requests.from_id =${id}
        UNION SELECT * FROM requests  WHERE requests.to_id =${id} `

        return new Promise((ok,error)=>{
            this.connect.query(query,(error,data)=>{
               
                ok(data  ) 
                         })
        })


       }






}

module.exports=new RequestsModel