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

CREATE TABLE kepek (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(255) NOT NULL
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
    kep_id INT,
    gazda_id INT,
    FOREIGN KEY (gazda_id) REFERENCES gazdik(id),
    FOREIGN KEY (kep_id) REFERENCES kepek(id)

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

INSERT INTO Velemenyek (Nev,Velemeny)VALUES
('Ádám','Nagyon aranyos kis kutyás sikerült választanunk. És nagyon barátságosak voltak a dolgozók.'),
('Maja','Egy kis kutyát és egy kis cicát is sikerült választaununk, nagyon segítőkészek voltak a dolgozók.');


INSERT INTO kepek (filename,filepath)VALUES
('1.jpg','public\images\1.jpg'),
('2.jpg','public\images\2.png'),
('3.jpg','public\images\3.jpg'),
('4.jpg','public\images\4.jpg'),
('5.jpg','public\images\5.jpg'),
('6.jpg','public\images\6.jpg'),
('7.jpg','public\images\7.jpg'),
('8.jpg','public\images\8.jpg'),
('9.jpg','public\images\9.jpg'),
('10.jpg','public\images\10.jpg'),
('11.jpg','public\images\11.jpg'),
('12.jpg','public\images\12.jpg');


INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo, adminjogosultsag)
VALUES ('admin', 'admin@teszt.hu', 'admin123', TRUE),
('felhasznalo', 'felhasznalo@teszt.hu', 'felhasznalo123', FALSE);


INSERT INTO allatok (kutya, ivar, allatnev, termet, szin, kor, leiras,kep_id) VALUES
(TRUE, 'szuka', 'Bodri', 'kicsi', 'barna', 3, 'Még visszahúzódó, félénk egy kicsit, de egy nyugodt otthonban, egy türelmes gazdi mellett hamar meg tudna nyílni.',1),
(FALSE, 'szuka', 'Gombóc', 'kicsi', 'cirmos', 1, 'Barátkozós, kedves bársonytalpú. Szinte azonnal barátságot köt mindenkivel, akivel találkozik. Kezdő cicásoknak is ajánljuk.',2),
(TRUE, 'kan', 'Coco', 'közepes', 'fehér', 5, 'Barátságos és aktív kutya, szeret sétálni, játszani.',3),
(FALSE, 'szuka', 'Dundi', 'közepes', 'fekete', 2, 'Bekuckózós bajnokunk, rendszerint a takaró alá bújik és a napja nagy részét ott tölti.',4),
(FALSE, 'szuka', 'Cirmi', 'közepes', 'fehér-fekete', 6, 'Játékos és energikus kutya, imád kint lenni a szabadban és labdázni.',5),
(TRUE, 'kan', 'Rex', 'kicsi', 'szürke-fehér', 2, 'Csendes, visszahúzódó jellem, de egy idő után megszereti az embereket.',6),
(FALSE, 'kan', 'Sanyi', 'nagy', 'fekete-fehér', 7, 'Barátságos és játékos, szeret futkározni és más kutyákkal játszani.',7),
(TRUE, 'kan', 'Szundi', 'közepes', 'barna-fekete', 4, 'Kedves és hűséges kutya, szeret a gazdájával lenni és sétálni menni.',8),
(FALSE, 'szuka', 'Saci', 'kicsi', 'barna', 2, 'Csendes és nyugodt cica, aki szeret a gazdájával összebújni és aludni.',9),
(TRUE, 'kan', 'Max', 'közepes', 'barna-fekete', 3, 'Aktív és vidám kutya, mindig kész egy kis kirándulásra vagy játékra.',10),
(FALSE, 'szuka', 'Saci', 'kicsi', 'foltos', 2, 'Csendes és nyugodt cica, aki szeret a gazdájával összebújni és aludni.',11),
(TRUE, 'kan', 'Morzsi', 'kicsi', 'szürke', 4, 'Kis termetű és igazán tekintélyt parancsoló kiállású kutya. Nem rögtön, de pár alkalom után már magától bújik egy kis simogatásért.',12);


INSERT INTO gazdik (gazdinev, varos, utca, hazszam, telefonszam) VALUES
('Kiss Péter', 'Kecskemét', 'Sárga Krumpli', 22, '123456789'),
('Nagy Dominika', 'Budapest', 'Kék út', 5, '987654321'),
('Kovács János', 'Debrecen', 'Zöld tér', 10, '1122334455');


INSERT INTO elozoev(honapok, osszallat, kutyak) VALUES
('Január', 5, 2),
('Február', 6, 5),
('Március', 2, 2),
('Április', 8, 6),
('Május', 4, 3),
('Június', 5, 4);