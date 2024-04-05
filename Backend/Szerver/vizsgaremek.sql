CREATE DATABASE mancsallatmenhely DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE mancsallatmenhely;

CREATE TABLE gazdik (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nev VARCHAR(255),
    varos VARCHAR(255),
    utca VARCHAR(255),
    hazszam INT,
    telefonszam VARCHAR(20)
);

CREATE TABLE allatok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kutya BOOLEAN,
    ivar VARCHAR(10),
    nev VARCHAR(255),
    termet VARCHAR(255),
    szin VARCHAR(255),
    kor INT,
    leiras VARCHAR(255),
    orokbefogadott BOOLEAN DEFAULT FALSE
);


CREATE TABLE Felhasznalok (
    FelhasznaloID INT PRIMARY KEY AUTO_INCREMENT,
    FelhasznaloNev VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Jelszo VARCHAR(50) NOT NULL,
    adminjogosultsag BOOLEAN DEFAULT FALSE
);

CREATE TABLE orokbefogadas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    allat_id INT,
    gazda_id INT,
    orokbefogadas_datum DATE,
    FOREIGN KEY (allat_id) REFERENCES allatok(id),
    FOREIGN KEY (gazda_id) REFERENCES gazdik(id)
);



INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo, adminjogosultsag)
VALUES ('admin', 'admin@teszt.hu', 'admin123', TRUE);

INSERT INTO allatok (kutya, ivar, nev, termet, szin, kor, leiras) VALUES
(TRUE, 'szuka', 'Bodri', 'kicsi', 'barna', 3, 'Még visszahúzódó, félénk egy kicsit, de egy nyugodt otthonban, egy türelmes gazdi mellett hamar meg tudna nyílni.'),
(FALSE, 'szuka', 'Gombóc', 'kicsi', 'cirmos', 1, 'Barátkozós, kedves bársonytalpú. Szinte azonnal barátságot köt mindenkivel, akivel találkozik. Kezdő cicásoknak is ajánljuk.'),
(TRUE, 'kan', 'Coco', 'közepes', 'fehér', 5, 'Barátságos és aktív kutya, szeret sétálni, játszani.'),
(FALSE, 'szuka', 'Dundi', 'közepes', 'fekete', 2, 'Bekuckózós bajnokunk, rendszerint a takaró alá bújik és a napja nagy részét ott tölti.'),
(TRUE, 'kan', 'Morzsi', 'kicsi', 'szürke', 4, 'Kis termetű és igazán tekintélyt parancsoló kiállású kutya. Nem rögtön, de pár alkalom után már magától bújik egy kis simogatásért.');


INSERT INTO gazdik (nev, varos, utca, hazszam, telefonszam) VALUES
('Kiss Péter', 'Kecskemét', 'Sárga Krumpli', 22, '123456789'),
('Nagy Dominika', 'Budapest', 'Kék út', 5, '987654321'),
('Kovács János', 'Debrecen', 'Zöld tér', 10, '1122334455');


INSERT INTO orokbefogadas (allat_id, gazda_id, orokbefogadas_datum) VALUES
(1, 1, '2023-05-10'),
(3, 2, '2023-04-20');