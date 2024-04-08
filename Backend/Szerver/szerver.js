const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

// app.use(bodyParser.urlencoded({ extended: true }));

//app.use(bodyParser.json());

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

    const cmd = `SELECT * FROM Felhasznalok WHERE Email = "${email}" AND Jelszo = "${password}"`;

    connection.query(cmd, (error, results, fields) => {
        if (error) {
            res.status(500).json({ "error": "Hiba a bejelentkezés során" });
        } else {
            if (results.length > 0) {
                const user = results[0];
                if (user.adminjogosultsag === 1) {
                    res.status(200).json({ "message": "Sikeres bejelentkezés", "user": user, "isAdmin": true });
                } else {
                    res.status(200).json({ "message": "Sikeres bejelentkezés", "user": user, "isAdmin": false });
                }
            } else {
                res.status(401).json({ error: "Rossz felhasználónév vagy jelszó" });
            }
        }
        connection.end();
    });
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

app.get('/data', (req, res) => {
    const connection = kapcsolat();
    connection.connect();

    const query = `SELECT honapok, osszallat, kutyak FROM elozoev`;
    
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Hiba az adatok lekérdezése során:', error);
            res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
        } else {
            console.log('Adatok sikeresen lekérdezve');
            res.status(200).json(results);
        }
        connection.end();
    });
});

app.post('/admin/update', bodyParser.json(), (req, res) => {
    const { email, adminjogosultsag } = req.body;
    const connection = kapcsolat();

    connection.connect();

    if (typeof adminjogosultsag !== 'boolean') {
        return res.status(400).json({ error: 'Az adminjogosultsag mező értéke nem valós boolean.' });
    }

    const updateQuery = `UPDATE Felhasznalok SET adminjogosultsag = ${adminjogosultsag ? 1 : 0} WHERE Email = "${email}"`;

    connection.query(updateQuery, (error, results) => {
        if (error) {
            console.error('Hiba történt az adminjogosultság frissítése során:', error);
            res.status(500).json({ error: 'Hiba történt az adminjogosultság frissítése során.' });
        } else {
            console.log('Adminjogosultság sikeresen frissítve.');
            res.status(200).json({ message: 'Adminjogosultság sikeresen frissítve.' });
        }
        connection.end();
    });
});

app.post('/velemenyek', bodyParser.json(), (req, res) => {
    const { nev, velemeny } = req.body;
    const connection = kapcsolat();
    connection.connect();

    const insertQuery = `INSERT INTO Velemenyek (Nev, Velemeny) VALUES  ("${nev}", "${velemeny}")`;

    connection.query(insertQuery, (error, result) => {
      if (error) {
        console.error('Hiba a vélemény mentése során:', error); 
        res.status(500).json({ error: 'Hiba a vélemény mentése során' });
      } else {
        console.log('Vélemény sikeresen mentve');
        res.status(200).json({result});
      }
      connection.end();
    });
});
  
app.get('/legfrissebb_velemenyek', (req, res) => {
    const connection = kapcsolat();
    connection.connect();
    const selectQuery = `SELECT * FROM Velemenyek ORDER BY ID DESC LIMIT 3`;
  
    connection.query(selectQuery, (error, result) => {
      if (error) {
        console.error('Hiba az adatok lekérdezése során:', error);
        res.status(500).json({ error: 'Hiba az adatok lekérdezése során' });
      } else {
        console.log('Legfrissebb vélemények sikeresen lekérdezve');
        res.status(200).json(result);
      }
      connection.end();
    });
});

app.post('/jelentkezes', bodyParser.json(), (req, res) => {
    const { onkentesnev, onkentesemail, telszam, kozepiskolas } = req.body;
    const connection = kapcsolat();
    connection.connect();

    let kozepiskolasBool = false;

    if (kozepiskolas === '1') {
        kozepiskolasBool = true;
    }

    const insertQuery = `INSERT INTO Onkentesek (onkentesnev, onkentesemail, telszam, kozepiskolas) VALUES ("${onkentesnev}", "${onkentesemail}", "${telszam}", ${kozepiskolas})`;

    connection.query(insertQuery, (error, result) => {
        if (error) {
            console.error('Hiba a jelentkezés mentése során:', error);
            res.status(500).json({ error: 'Hiba a jelentkezés mentése során' });
        } else {
            console.log('Jelentkezés sikeresen mentve');
            res.status(200).json({ message: 'Jelentkezés sikeresen mentve' });
        }
        connection.end();
    });
});

app.post('/allatokszerkesztese', bodyParser.json(), (req, res) => {
    const { kutya, ivar, allatneve, allattermete, allatszine, allatkora, allatleirasa } = req.body;
    const connection = kapcsolat();
    connection.connect();

    let kutyaBool = false;

    if (kutya === '1') {
        kutyaBool = true;
    }

    const insertQuery = `INSERT INTO allatok (kutya, ivar, allatnev, termet, szin, kor, leiras ) VALUES (${kutya}, "${ivar}", "${allatneve}", "${allattermete}", "${allatszine}", "${allatkora}", "${allatleirasa}")`;

    connection.query(insertQuery, (error, result) => {
        if (error) {
            console.error('Hiba a mentés során:', error);
            res.status(500).json({ error: 'Hiba a mentés során' });
        } else {
            console.log('Állat sikeresen mentve');
            res.status(200).json({ message: 'Állat sikeresen mentve' });
        }
        connection.end();
    });
});

app.post('/kereses',bodyParser.json(), (req, res) => {
    const { kutyakereses, ivarkereses, korkereses } = req.body;
    const connection = kapcsolat();
    connection.connect();

    let kutyakeresesBool = false;
    if (kutyakereses === '1') {
        kutyakeresesBool = true;
    }
    
    const allatok = `SELECT * FROM allatok WHERE kutya = ${kutyakereses} AND ivar = "${ivarkereses}" AND kor = ${korkereses}`;
    
    connection.query(allatok, (error, result) => {
            if (error) {
                console.error('Hiba a keresés során:', error);
                res.status(500).json({ error: 'Hiba a keresés során' });
            } else {
                console.log('Sikeres keresés');
                res.status(200).json(result);
            }
            connection.end();
    });
    
});

app.post('/jelszomodositas', bodyParser.json(), (req, res) => {
    const { email, regijelszo, ujjelszo } = req.body;
    const connection = kapcsolat();

    connection.connect();

    const updateQuery = `UPDATE Felhasznalok SET Jelszo = "${ujjelszo}" WHERE Email = "${email}" AND Jelszo="${regijelszo}"`;

    connection.query(updateQuery, (error, results) => {
        if (error) {
            console.error('Hiba történt a jelszó módosítása során:', error);
            res.status(500).json({ error: 'Hiba történt a jelszó módosítása során.' });
        } else {
            console.log('Jelszó sikeresen módosítva.');
            res.status(200).json(results);
        }
        connection.end();
    });
});

app.listen(8080);
