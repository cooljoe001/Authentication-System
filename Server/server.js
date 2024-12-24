
import express from "express";
import cors from 'cors'
import mysql from "mysql2";
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;





//DATABASE CONNECTIONS WITH MYSQL

const db = mysql.createConnection({
    host:process.env.dbhost,
    user:process.env.dbuser,
    password:process.env.dbpass,
    database:process.env.dbname
})

db.connect((err)=>{
    if(!err){
        console.log(" connected to database")
    }else{
        console.log("Error connecting to database")
    }
})





// Registration endpoints
app.post("/register",async(req,res)=>{
 console.log(req.body);
 const {firstname,lastname,email,password}= req.body;

 //DB QUERY OR SQL QUERIES
 const findUser = 'select * from users where email = ?';

 //  FINDING OUT IF A USER ALREADY EXIST IN THE DB
 db.query(findUser, [email], (err,result)=>{
    if(result.length > 0){
        res.send("User already exists")
    }else{

        // Hashing password before storing data
        const hashedPassword = bcrypt.hashSync(password,10);

        // STORING USER IN DB

         const storeUserDetails = 'insert into users(firstname,lastname,email,password,createdAt) values (?,?,?,?,?)';
        db.query(storeUserDetails,[firstname,lastname,email,hashedPassword,new Date()],(err,results)=>{
            if(err){
                res.send("Error encounted during registration")
            }else{
                res.send('User registered successfully')
            }

        })

    }
 })

 
})

// End point for logging a user in 
app.post("/login",async(req,res)=>{

    // Login request body
    console.log(req.body)
    const {email,password} = req.body;

    // LOGIN QUERY TO FIND USER BY MAIL
    const findUserQuery = 'SELECT * from users WHERE email = ?';

    db.query(findUserQuery,[email],(err,result)=>{

        // CHECKING IF USER THERE IS AN ERROR
        
           if(err){
          return  res.status(500).json({message:"Server error, please try again "})
           }
  
        

        // CHECKING IF USER ALREADY EXISTS
        if(result.length > 0){
 
            // comparing password

             const checkPassword =  bcrypt.compareSync(password,result[0].password);
               
             // CHECKING IF PASSWORD IS TRUE OR CORRECT 
             if(checkPassword){

                // CREATING A TOKEN
                const token = jwt.sign(result[0], 'authtoken');
                console.log(token);
                res.status(200).json({message:"Login successful",'token':token})

                // res.status(200).json({message:"Login success"})
             }else{
                // res.status(400).json({message:"Invalid password"})
                res.send('Invalid password')
             }
             
 
            // return res.status(200).json({message:"User found"})


        }else{
            
            res.send("Invalid email")
            // return res.status(404).json({message:"Invalid Email"})
        }


    })

 
})

//  End point for checking users
app.post("/check-user", async(req,res)=>{
 const {token}= req.body;
 const verifyToken = jwt.verify(token, 'authtoken')
   console.log(verifyToken)
   res.send(verifyToken);
})


app.listen(port,()=>{
    console.log("server running on port 8000");
})