const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

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

app.get('/login', bodyParser.json(), (req, res) => {
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

app.post('/regisztracio', (req, res) => {
    const { FelhasznaloNev, Email, Jelszo } = req.body;

    const sql = 'INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo) VALUES ('+FelhasznaloNev+','+ Email+','+Jelszo+')';
    connection.query(sql, [FelhasznaloNev, Email, Jelszo], (err, result) => {
        if (err) {
            console.error('hiba a felhasznalo adataival:', err);
            res.status(500).json({ error: 'Hiba a regisztráció során' });
            return;
        }
        console.log('felhasznalo regiszt');
        res.status(200).json({ message: 'Sikeres regisztráció' });
    });
});



app.listen(8080);