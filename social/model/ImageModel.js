const Model=require('../router/model')
class ImageModel extends Model{
    constructor(){
        super()
        this.table="image"
    }

findImages(obj){
    let query= `select * from image where `
    for (let i in obj){
        query+=`${i}='${obj[i]}' and `
    }
    query=query.substring(0,query.length-4)
        return new Promise((ok,errors)=>{
        this.connect.query(query, (error,data)=>{
            if(error)throw error
            ok(data  ) 
                     })
                 })
}




    uploadImage(id,image){
   
        this.connect.query(`INSERT INTO image (user_id,pic_url) VALUES('${id}','${image}')`,(error,data)=>{
            if(error) throw error
        
        }) 
          }



}

module.exports=new ImageModel