import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import db from './config/db.js'
import bcrypt, { hash } from 'bcrypt'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 8080

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", 'GET','PUT', 'DELETE'],
    credentials: true
}));

app.use(cookieParser())
app.use(express.json())

const salt = 10;
// const authenticateToken = (req, res) =>{
//     const token = req.cookies.token

//     if(!token) return res.status(401).json({error: "Unauthorized"});

//     jwt.verify(token, process.env.MY_SECRET_KEY, (err, result) =>{
//         if (err) return res.sendStatus(403); 
//         req.user = user; 
      
//         next();
//     })
// }


const logger = (req, res, next) =>{
    console.log(`${req.method} ${req.url}`)
    next();
}

app.post('/login', logger, async (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM \`user\` WHERE username = ?`;


   
    db.query(query, [username], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid Username' });
        }

        bcrypt.compare(password, result[0].password,(err, response) =>{
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
            }

            if(response){
                const payload = {
                    user_id: result[0].user_id
                };
                const token = jwt.sign(payload, process.env.MY_SECRET_KEY, { expiresIn: "1d" });
                res.cookie('token', token, {
                    httpOnly: true
                });
                return res.status(200).json({ message: 'Login successful' });
            }
            else{
                return res.status(401).json({ error: 'Password does not match' });
            }

        });
    });
});

app.post('/register', async (req, res)  =>{
    // console.log(req.body)
    const {username, password, firstname, lastname, email} = req.body;

   
    const addUser = async () => {   
        const hash = await bcrypt.hash(password, salt);
        const addUserQuery = `INSERT INTO \`user\`(username, password) VALUES (?, ?)`;    

        return new Promise((resolve, reject) => {
            db.query(addUserQuery, [username, hash], (err, result) => {
                if (err) {
                    console.log(err)
                    return reject('Something went wrong: ' + err.message);
                }
                resolve(result);
            });
        });            
    };
    const addUserDetails  = async (id) => {     
        const addUserDetailsQuery = `INSERT INTO user_details (user_id, first_name,last_name, email) VALUES (?,?,?, ?)`;
        const values = [ id, firstname, lastname, email]
        return new Promise((resolve, reject) => {
            db.query(addUserDetailsQuery, values, (err, result) => {
                if (err) {
                    console.log(err)
                    return reject('Something went wrong: ' + err.message);
                }
                resolve(result);
            });
        });
    };

    try{
        const checkExisting = `SELECT * FROM \`user\` u INNER JOIN user_details ud ON u.user_id = ud.user_id WHERE u.username = ? OR ud.email =?`
        const result = await new Promise((resolve, reject) =>{
                db.query(checkExisting, [username,email], (err, result) =>{
                    if (err) {
                        console.log(err)
                        return reject('Something went wrong: ' + err.message);
                    }

                    resolve(result) 
                })
        })

        if(result.length === 0){
            const id = await addUser()
            await addUserDetails(id.insertId)

            return res.status(201).json({message: "Successfully created"})
        }
        else{
            if(result[0].email == email){
                return res.status(400).json({ error: "Email already exists" });
            }
            else if(result[0].username == username){
                return res.status(400).json({error:"Username already exists"})
            }
           
        }
    }
    catch(error){
        return res.status(500).json({error:"Something went wrong"})
    }

   
});

app.listen(PORT, () =>{
    console.log(`Server is listening to PORT ${PORT}`);
    
});

