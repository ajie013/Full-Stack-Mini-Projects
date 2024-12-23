import db from '../config/db.js';

const getAllUsers = (req,res) =>{
    const query = "Select * from user"
    db.query(query, (err,data) =>{
        if(err) return res.send(err);
 
        return res.json(data)
    });
}

const getUserById = (req,res) =>{
    const id = parseInt(req.params.id);

    const query = `Select * from user where user_id = ${id}`
    db.query(query, (err,data) =>{
        if(err) return res.send(err);
 
        return res.json(data)
    });
}

const addUser = (req,res) =>{
   const email = req.body.email;

   const checkEmailSql = "SELECT * FROM user WHERE email = ?";
   
   db.query(checkEmailSql, [email], (err, results) => {
       if (err) {
           console.error(err); 
           return res.status(500).json({ message: "Something unexpected occurred" });
       }
    
       if (results.length > 0) {
           return res.status(400).json({ message: "Email already exists" });
       }

       const sql = "INSERT INTO user (first_name, last_name, email, birthdate, contact_number, gender, country) VALUES (?, ?, ?, ?, ?, ?, ?)";
   
       const values = [
           req.body.first_name,
           req.body.last_name,
           req.body.email,
           req.body.birthdate,
           req.body.contact_number,
           req.body.gender,
           req.body.country
       ];

     
       db.query(sql, values, (err, result) => {
           if (err) {
              
               return res.status(500).json({ message: "Something unexpected occurred" });
           }
           return res.status(201).json({ message: "Successfully created a new user" });
       });
   });
}


const deleteUser = (req,res) =>{
    const id = parseInt(req.params.id);
  
    const query = `delete from user where user_id = ${id}`
    db.query(query, (err,data) =>{
        if(err) return res.send(err);
 
        return res.json(data)
    });
 
}

const updateUser = (req, res) =>{
    const id = parseInt(req.params.id);
    const query = `UPDATE user
    SET first_name = ?,
        last_name = ?,
        email = ?,
        birthdate = ?,
        contact_number = ?,
        gender = ?,
        country = ?
    WHERE user_id = ? `;
 
    const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.birthdate,
        req.body.contact_number,
        req.body.gender,
        req.body.country,
        id
    ];
 
    db.query(query,values, (err,data) =>{
      
        if (err) {
           
            return res.status(500).json({ message: "Something unexpected occurred" });
        }
        return res.status(200).json({ message: "Successfully updated the user" });
     
    });
}

export {getAllUsers, getUserById, addUser, updateUser, deleteUser }