const mysql = require('mysql2')

const pool = mysql.createPool({
    host:process.env.host,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    connectionLimit : 100

})
pool.getConnection((err,connection)=>{
    if(err)throw err;
    console.log('connected as ID ' + connection.threadId)
})


// use the connection to get every user
exports.view = (req,res)=>{
pool.query(`select * from users `,(err,rows)=>{
    if(!err){
        console.log(rows)
        res.render('home.ejs',{rows})
    }else{
        console.log(err)
    }
})
} 


// find user via search
exports.find = (req,res)=>{
    let searchTearm = req.body.search
    pool.query(`select * from users where first_name LIKE ? or last_name like ? or phone like ? `,['%'+ searchTearm + '%','%'+ searchTearm + '%','%'+ searchTearm + '%'],(err,rows)=>{
        if(!err){
            console.log(rows)
            res.render('home.ejs',{rows})
        }else{
            console.log(err)
        }
    })
}





//  geting add user page 
exports.addform = (req ,res)=>{
    res.render('adduser.ejs',{alert:''})
}  


// adding the user after filling the form
exports.created = (req,res)=>{
    const {first_name, last_name , email , phone , comments} = req.body
    pool.query(`insert into users set first_name = ? ,
         last_name = ? ,
          email = ? , 
          phone = ? , 
          comments = ?`,[first_name,last_name,email,phone,comments] ,(err,rows)=>{
        if(!err){
            console.log(rows)
            res.render('adduser.ejs',{alert: 'User added Successfully.'})
        }else{
            console.log(err)
        }
    })
}





// geting the edit page and also geting the user info by id 
exports.editform = (req,res)=>{
       const id = req.params.id
    pool.query(`select * from users where id = ?`,[id],(err,rows)=>{
        if(!err){
            console.log(rows)
            res.render('edituser.ejs',{ rows,id ,alert: ''})
        }else{
            console.log(err)
        }
    })
}



// posting and updating the user using the id after filling edit form
exports.edited = (req,res)=>{
    const id = req.params.id
    const {first_name, last_name , email , phone , comments} = req.body
    pool.query(`update users set first_name = ? ,
         last_name = ? ,
          email = ? , 
          phone = ? , 
          comments = ? where id = ?`,
          [first_name,last_name,email,phone,comments, id] ,(err,rows)=>{
        if(!err){
                pool.query(`select first_name,last_name,email,phone,comments from users where id = ?`,[id],(err,rows)=>{
                  console.log(rows)
                    res.render('edituser.ejs',{ rows,id ,alert: 'User Updated Successfully.'})
          })
        }else{
            console.log(err)
        }
    })
}





// rendering the delete page
exports.delete= (req,res)=>{
const id = req.params.id
    pool.query(`select * from users where id =?`,[id],(err,rows)=>{
        if(!err){
            console.log(rows)
            res.render('deleteuser.ejs', {rows, id, alert:''})
        }else{
            console.log(err)
        }
    })
}



// deleting the user
exports.deleted= (req,res)=>{
    const id = req.params.id
        pool.query(`delete from users where id =?`,[id],(err,rows)=>{
            if(!err){
                const id = 0
              pool.query(`select * from users where id =?`,[id],(err,rows)=>{
              console.log(rows)
              res.render('deleteuser.ejs', {rows, id, alert:"User Deleted successfully"})
    })
    }else{
         console.log(err)
         }
        })
    }



    exports.viewmore = (req,res)=>{
        const id = req.params.id
        pool.query(`select * from users where id = ? `,[id],(err,rows)=>{
            if(!err){
                console.log(rows)
                res.render('viewuser.ejs',{rows})
            }else{
                console.log(err)
            }
        })
        } 


