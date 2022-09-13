const express =require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 4001;
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Password123',
    database: 'Huddles'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post('/login', (req, res) => {

    const userEmail = req.body.userEmail
    const userPassword = req.body.passwrd

    const sqlSelect = "SELECT * FROM  users WHERE userEmail = ? AND  userPassword = ?";
    db.query(sqlSelect [userEmail, userPassword],(err, result) => {
        if(err){
            res.send({err: err});
        }
        if(result.length > 0){
            res.send(result);
        }else{
            res.send({message: 'Email and Password does not match'})
        }
    })
    
});

app.post('/register', (req, res) => {

    const userEmailLogin = req.body.userEmailReg
    const userPasswordLogin = req.body.passwrdReg

    const sqlInstert = "INSERT INTO users (userEmail, userPassword) VALUES (?, ?)";
    db.query(sqlInstert, [userEmailLogin, userPauserPasswordLoginsswordReg],(err, result) => {
        res.send(err);
    })
    
});

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));