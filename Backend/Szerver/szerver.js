const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(bodyParser.json());

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
    const adat = req.body;
    const connection = kapcsolat();
    connection.connect();

    const cmd = `SELECT * FROM Felhasznalok WHERE Email = "${adat.email}" AND Jelszo = "${adat.password}"`;

    connection.query(cmd, (error, results, fields) => {
        if (error) {
            res.status(500).json({ "error": "Hiba a bejelentkezés során" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ "message": "Sikeres bejelentkezés", "userData": results[0] , "valasz": true});
            } else {
                res.status(401).json({ error: "Rossz felhasználónév vagy jelszó" });
            }
        }
    });

    connection.end();
});


app.post('/regisztracio', bodyParser.json(), (req, res) => {
    const { FelhasznaloNev, Email, Jelszo } = req.body;
    const connection = kapcsolat();

    connection.connect();

    const checkQuery = `SELECT * FROM Felhasznalok WHERE Email = "${Email}" OR FelhasznaloNev = "${FelhasznaloNev}"`;
    connection.query(checkQuery, (checkError, checkResults) => {
        if (checkError) {
            console.error('Hiba az ellenőrzés során:', checkError);
            res.status(500).json({ error: 'Hiba az ellenőrzés során' });
            connection.end();
            return;
        }

        if (checkResults.length > 0) {
            res.status(400).json({ error: 'Ezzel az email-címmel/felhasználónévvel már regisztráltak!' });
            connection.end();
            return;
        }
        
        const insertQuery = `INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo) VALUES ("${FelhasznaloNev}", "${Email}", "${Jelszo}")`;
        connection.query(insertQuery, (insertError, result) => {
            if (insertError) {
                console.error('Hiba a felhasználó adataival:', insertError);
                res.status(500).json({ error: 'Hiba a regisztráció során' });
                connection.end();
                return;
            }
            console.log('Felhasználó sikeresen regisztrálva');
            res.status(200).json({ message: 'Sikeres regisztráció' });
            connection.end();
        });
    });
});
app.listen(8080);