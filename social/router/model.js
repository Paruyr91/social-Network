const mysql=require('mysql')


class Model{
    constructor(){
      this.connect= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'chat'
      }) 
      this.table=''
    }


insert(obj){
    let keys= Object.keys(obj)
    keys=(keys.join(','))
    let value=Object.values(obj)
    value=(value.join('","'))
    this.connect.query(`insert into ${this.table}(${keys}) values ("${value}")`, (error, data)=>{
if(error)throw error
})
}

find(obj){
    let query= `select * from ${this.table} where `
    for (let i in obj){
        query+=`${i}='${obj[i]}' and `
    }
    query=query.substring(0,query.length-4)
        return new Promise((ok,errors)=>{
        this.connect.query(query, (error,data)=>{
            
            ok(data  )
                     })
                 })
}


findAll(){
 return new Promise((ok,errors)=>{
        this.connect.query(`SELECT * FROM user`, (error,data)=>{
            if(error)throw error
            ok(data  )
                     })
                 })
}

update(obj,id){
    let query=''
    for (let i in obj){
        query+=` ${i}='${obj[i]}',`
    }
    query=query.substring(0,query.length-1)
    this.connect.query(`Update ${this.table} Set ${query} where id=${id}`, (error, data)=>{
if(error)throw error
})
}


deletById(id){
this.connect.query(`delete from ${this.table} where id=${id}`,(error,data)=>{
    if(error)throw error
})
}


}

module.exports= Model