const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const mysql = require('mysql');

const kapcsolat = ()=>{
    return mysql.createConnection({
        host: 'localhost' ,
        user: 'root' ,
        password: '' ,
        database: "mancsallatmenhely"
    })
}

app.get('/', (req,res)=>{
    const connection = kapcsolat();
    connection.connect()
    connection.query("show tables",(error,results,fields)=>{
        if(error)
            res.send({"error": "Hiba a lekérés során"})
        else
            res.send(results);
    });

    connection.end();
});

app.post('/login', bodyParser.json(), (req, res) => {
    const { email, password } = req.body;
    const connection = kapcsolat();

    connection.connect();

    connection.query("SELECT * FROM Felhasznalok WHERE Email = ? AND Jelszo = ?", [email, password], (error, results, fields) => {
        if (error) {
            res.status(500).json({ error: "Hiba a bejelentkezés során" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: "Sikeres bejelentkezés", userData: results[0] , valasz: true});
            } else {
                res.status(401).json({ error: "Rossz felhasználónév vagy jelszó" });
            }
        }
    });

    connection.end();
});

app.listen(8080);