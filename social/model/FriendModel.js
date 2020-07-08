const Model=require('../router/model')
class FriendModel extends Model{
    constructor(){
        super()
        this.table="friends"
    }


        findById(id,myId){
                return new Promise((ok,error)=>{
                    this.connect.query(`select * from friends where from_id=${id}
                    and to_id=${myId} or from_id=${myId} and to_id=${id} `,(error,data)=>{
                       
                        ok(data  ) 
                                 })
                })
        }
     
        deletFriendById(myid,frindid){
            this.connect.query(`DELETE FROM chat.friends WHERE from_id = '${myid}' AND to_id='${frindid}'`,(error,data)=>{
                if(error)throw error
            })
            this.connect.query(`DELETE FROM chat.friends WHERE from_id = '${frindid}' AND to_id='${myid}'`,(error,data)=>{
                if(error)throw error
            })
            }


           aceptFriend(myid,frindid){

                this.connect.query(`INSERT INTO chat.friends (from_id, to_id) VALUES ('${frindid}', '${myid}');`,(error,data)=>{
                    if(error)throw error
                })
            }



           findFriend(id){
            let query=`SELECT friends.to_id FROM friends  WHERE friends.from_id =${id} 
            UNION SELECT friends.from_id FROM friends  WHERE friends.to_id =${id} `

            return new Promise((ok,error)=>{
                this.connect.query(query,(error,data)=>{
                   
                    ok(data  ) 
                             })
            })


           }




              

                }



module.exports=new FriendModel