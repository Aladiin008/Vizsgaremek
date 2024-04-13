CREATE DATABASE mancsallatmenhely DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE mancsallatmenhely;


CREATE TABLE Felhasznalok (
    FelhasznaloID INT PRIMARY KEY AUTO_INCREMENT,
    FelhasznaloNev VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Jelszo VARCHAR(50) NOT NULL,
    adminjogosultsag BOOLEAN DEFAULT FALSE
    
);

CREATE TABLE Onkentesek(
    ID INT AUTO_INCREMENT PRIMARY KEY,
    onkentesnev VARCHAR(255),
    onkentesemail VARCHAR(255),
    telszam VARCHAR(20),
    kozepiskolas BOOLEAN,
    felhasznalo_id INT,
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalok(FelhasznaloID)
);

CREATE TABLE gazdik (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gazdinev VARCHAR(255),
    varos VARCHAR(255),
    utca VARCHAR(255),
    hazszam INT,
    telefonszam VARCHAR(20),
    felhasznalo_id INT,
    FOREIGN KEY (felhasznalo_id) REFERENCES Felhasznalok(FelhasznaloID)
);

CREATE TABLE allatok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kutya BOOLEAN DEFAULT FALSE,
    ivar VARCHAR(10),
    allatnev VARCHAR(255),
    termet VARCHAR(255),
    szin VARCHAR(255),
    kor INT,
    leiras VARCHAR(255),
    orokbefogadott BOOLEAN DEFAULT FALSE,
    gazda_id INT,
    FOREIGN KEY (gazda_id) REFERENCES gazdik(id)

);

CREATE TABLE kepek (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL
);


CREATE TABLE elozoev(
    honapok VARCHAR(50),
    osszallat INT,
    kutyak INT
);

CREATE TABLE Velemenyek (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Nev VARCHAR(255) NOT NULL,
    Velemeny VARCHAR(255) NOT NULL
);




INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo, adminjogosultsag)
VALUES ('admin', 'admin@teszt.hu', 'admin123', TRUE),
('felhasznalo', 'felhasznalo@teszt.hu', 'felhasznalo123', FALSE);


INSERT INTO allatok (kutya, ivar, allatnev, termet, szin, kor, leiras) VALUES
(TRUE, 'szuka', 'Bodri', 'kicsi', 'barna', 3, 'Még visszahúzódó, félénk egy kicsit, de egy nyugodt otthonban, egy türelmes gazdi mellett hamar meg tudna nyílni.'),
(FALSE, 'szuka', 'Gombóc', 'kicsi', 'cirmos', 1, 'Barátkozós, kedves bársonytalpú. Szinte azonnal barátságot köt mindenkivel, akivel találkozik. Kezdő cicásoknak is ajánljuk.'),
(FALSE, 'szuka', 'Zsuzsi', 'közepes', 'fekete-fehér', 5, 'Kedves és érzékeny macska, aki szereti a csendes és nyugodt környezetet.'),
(TRUE, 'kan', 'Coco', 'közepes', 'fehér', 5, 'Barátságos és aktív kutya, szeret sétálni, játszani.'),
(FALSE, 'szuka', 'Dundi', 'közepes', 'fekete', 2, 'Bekuckózós bajnokunk, rendszerint a takaró alá bújik és a napja nagy részét ott tölti.'),
(TRUE, 'kan', 'Morzsi', 'kicsi', 'szürke', 4, 'Kis termetű és igazán tekintélyt parancsoló kiállású kutya. Nem rögtön, de pár alkalom után már magától bújik egy kis simogatásért.'),
(TRUE, 'kan', 'Max', 'közepes', 'fekete', 4, 'Barátságos és játékos kutya, szeret sétálni és játszani a labdával.'),
(FALSE, 'szuka', 'Luna', 'kicsi', 'fehér', 2, 'Életvidám és kedves kis macska, szeret játszani és szeretetteljes.'),
(TRUE, 'kan', 'Rocky', 'nagy', 'barna', 5, 'Imád sétálni és futkározni a kertben, nagyon ragaszkodó és odaadó.'),
(TRUE, 'kan', 'Buddy', 'közepes', 'szürke', 3, 'Barátságos és energikus kutya, aki szeret játszani és futkározni.'),
(TRUE, 'kan', 'Rex', 'közepes', 'fekete', 3, 'Játékos és vidám kutya, aki szeret más kutyákkal ismerkedni a parkban.'),
(FALSE, 'szuka', 'Molly', 'nagy', 'tarka', 6, 'Nyugodt és hűséges kutya, szeret pihenni és sétálni a természetben.'),
(FALSE, 'szuka', 'Sári', 'kicsi', 'fekete-fehér', 1, 'Életvidám és mozgékony kiscica, aki imád játszani a labdával.'),
(TRUE, 'kan', 'Brutus', 'nagy', 'barna', 5, 'Őrző-védő kutya, aki nagyon odaadó és hűséges a családjához.'),
(FALSE, 'szuka', 'Dolly', 'közepes', 'szürke', 2, 'Nyugodt és kiegyensúlyozott kis macska, aki szeret simogatásokat kapni.'),
(TRUE, 'kan', 'Bruno', 'nagy', 'fekete', 4, 'Energikus és játszós kutya, aki szeret futkározni a kertben és a parkban.');


INSERT INTO gazdik (gazdinev, varos, utca, hazszam, telefonszam) VALUES
('Kiss Péter', 'Kecskemét', 'Sárga Krumpli', 22, '123456789'),
('Nagy Dominika', 'Budapest', 'Kék út', 5, '987654321'),
('Kovács János', 'Debrecen', 'Zöld tér', 10, '1122334455'),
('Nagy Márta', 'Budapest', 'Kék utca', 10, '987654321'),
('Kovács István', 'Debrecen', 'Zöld út', 15, '234567890'),
('Tóth Gábor', 'Szeged', 'Piros tér', 5, '345678901');


INSERT INTO elozoev(honapok, osszallat, kutyak) VALUES
('Január', 5, 2),
('Február', 6, 5),
('Március', 2, 2),
('Április', 8, 6),
('Május', 4, 3),
('Június', 5, 4);