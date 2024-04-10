CREATE DATABASE mancsallatmenhely DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE mancsallatmenhely;

CREATE TABLE allatok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kutya BOOLEAN DEFAULT FALSE,
    ivar VARCHAR(10),
    allatnev VARCHAR(255),
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

CREATE TABLE orokbefogadas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    allat_id INT,
    gazda_id INT,
    orokbefogadas_datum DATE,
    FOREIGN KEY (allat_id) REFERENCES allatok(id),
    FOREIGN KEY (gazda_id) REFERENCES gazdik(id)
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
VALUES ('admin', 'admin@teszt.hu', 'admin123', TRUE);
VALUES ('teszt', 'teszt@teszt.hu', 'teszt123', FALSE);

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
(TRUE, 'kan', 'Bruno', 'nagy', 'fekete', 4, 'Energikus és játszós kutya, aki szeret futkározni a kertben és a parkban.'),
(TRUE, 'kan', 'Spike', 'közepes', 'barna', 2, 'Aktív és kíváncsi kutya, aki mindig kész a játékra és a sétákra.'),
(FALSE, 'szuka', 'Cili', 'kicsi', 'tarka', 1, 'Érdeklődő és cuki kis macska, aki mindig kíváncsi az új dolgokra.'),
(TRUE, 'kan', 'Maxi', 'közepes', 'fehér', 6, 'Nyugodt és békés kutya, aki szeret pihenni a napsütésben és a kanapén.'),
(FALSE, 'szuka', 'Mimi', 'nagy', 'fekete', 3, 'Kedves és érzékeny macska, aki szeret az ölben pihenni és cicaelemeket vadászni a lakásban.'),
(TRUE, 'kan', 'Foltos', 'közepes', 'fekete-fehér', 4, 'Barátságos és játékos kutya, aki imád sétálni a parkban és futkározni a kertben.'),
(TRUE, 'kan', 'Rexi', 'nagy', 'barna', 5, 'Életvidám és energikus kutya, aki mindig kész az új kalandokra és a játékra.'),
(FALSE, 'szuka', 'Puszi', 'közepes', 'fekete', 3, 'Kedves és szeretetteljes macska, aki nagyon ragaszkodik a gazdijához és szeret simogatásokat kapni.'),
(FALSE, 'szuka', 'Cirmi', 'kicsi', 'szürke', 1, 'Cuki és kíváncsi kiscica, aki szeret játszani a labdával és felfedezni az otthonát.'),
(TRUE, 'kan', 'Bátor', 'nagy', 'fekete', 2, 'Bátor és kiegyensúlyozott kutya, aki mindig megvédi a családját és szeret játszani a gyerekekkel.'),
(FALSE, 'szuka', 'Manci', 'kicsi', 'fekete-fehér', 1, 'Édes és játékos kis macska, aki mindig szereti az ölelést és a simogatást.'),
(TRUE, 'kan', 'Dagadt', 'közepes', 'szürke', 6, 'Kedves és nyugodt kutya, aki nagyon szereti a családját és mindig mellettük van.'),
(FALSE, 'szuka', 'Cuki', 'nagy', 'fehér', 3, 'Érzékeny és játékos macska, aki szeret játszani a játékokkal és a cicaelemekkel.'),
(TRUE, 'kan', 'Szép', 'közepes', 'fekete', 4, 'Szép és bátor kutya, aki mindig vigyáz a családjára és szereti a hosszú sétákat.'),
(TRUE, 'kan', 'Rex', 'közepes', 'fekete', 3, 'Játékos és vidám kutya, aki szeret más kutyákkal ismerkedni a parkban.'),
(TRUE, 'kan', 'Brutus', 'nagy', 'barna', 5, 'Őrző-védő kutya, aki nagyon odaadó és hűséges a családjához.'),
(FALSE, 'szuka', 'Sári', 'kicsi', 'fekete-fehér', 1, 'Életvidám és mozgékony kiscica, aki imád játszani a labdával.'),
(FALSE, 'szuka', 'Dolly', 'közepes', 'szürke', 2, 'Nyugodt és kiegyensúlyozott kis macska, aki szeret simogatásokat kapni.'),
(TRUE, 'kan', 'Bruno', 'nagy', 'fekete', 4, 'Energikus és játszós kutya, aki szeret futkározni a kertben és a parkban.'),
(FALSE, 'szuka', 'Cili', 'kicsi', 'tarka', 1, 'Érdeklődő és cuki kis macska, aki mindig kíváncsi az új dolgokra.'),
(FALSE, 'szuka', 'Mimi', 'nagy', 'fekete', 3, 'Kedves és érzékeny macska, aki szeret az ölben pihenni és cicaelemeket vadászni a lakásban.'),
(TRUE, 'kan', 'Spike', 'közepes', 'barna', 2, 'Aktív és kíváncsi kutya, aki mindig kész a játékra és a sétákra.'),
(FALSE, 'szuka', 'Lili', 'kicsi', 'fehér', 1, 'Cseperedő kiscica, aki tele van energiával és felfedezésre vágyik a lakásban.'),
(TRUE, 'kan', 'Samu', 'nagy', 'szürke', 7, 'Bölcs és tapasztalt kutya, aki imád sétálni az erdőben és a hegyekben.'),
(FALSE, 'szuka', 'Rózsi', 'közepes', 'cirmos', 4, 'Kedves és játszós macska, aki mindig keresi a társaságot és az érdekes játékokat.'),
(TRUE, 'kan', 'Béni', 'közepes', 'fekete-fehér', 5, 'Barátságos és vidám kutya, aki imádja a vízpartot és a labdázást a parkban.'),
(FALSE, 'szuka', 'Sisi', 'kicsi', 'fekete', 2, 'Édes és kis bújós macska, aki mindig a gazdájára vágyik és szereti a kényeztetést.'),
(FALSE, 'szuka', 'Duci', 'közepes', 'szürke', 3, 'Kedves és hűséges macska, aki mindig a gazdáját keresi és szereti a simogatást.'),
(TRUE, 'kan', 'Tommi', 'nagy', 'barna', 6, 'Játékos és aktív kutya, aki imádja a hosszú sétákat és a kutyabarát kirándulásokat.'),
(TRUE, 'kan', 'Maxi', 'közepes', 'fehér', 6, 'Nyugodt és békés kutya, aki szeret pihenni a napsütésben és a kanapén.'),
(TRUE, 'kan', 'Furkesz', 'kicsi', 'tarka', 1, 'Érdekes és kíváncsi kiskutya, aki mindig a környezetét figyeli és felfedezésre indul.'),
(FALSE, 'szuka', 'Manci', 'közepes', 'fehér', 4, 'Nyugodt és békés macska, aki szereti a napsütést és az ablakból való kilátást.'),
(TRUE, 'kan', 'Morzsi', 'közepes', 'fekete', 5, 'Életvidám és mozgékony kutya, aki mindig keresi a kalandokat és az izgalmas tevékenységeket.'),
(FALSE, 'szuka', 'Mimi', 'kicsi', 'barna', 2, 'Kedves és játszós cica, aki mindig talál valami érdekes dolgot a lakásban és a kertben.'),
(TRUE, 'kan', 'Szamóca', 'nagy', 'fekete', 8, 'Bölcs és türelmes kutya, aki imádja a családi kirándulásokat és a természetjárásokat.'),
(FALSE, 'szuka', 'Róka', 'közepes', 'narancssárga', 3, 'Érdeklődő és aktív macska, aki mindig valami érdekes dolgot keres a lakásban és a kertben.'),
(TRUE, 'kan', 'Csoki', 'közepes', 'barna', 4, 'Kedves és barátságos kutya, aki mindig kész az együtt töltött időre és a játékra.'),
(FALSE, 'szuka', 'Fanni', 'kicsi', 'fehér', 1, 'Édes és játékos kiscica, aki mindig vidám és életvidám a gazdájával.'),
(TRUE, 'kan', 'Barna', 'nagy', 'barna', 6, 'Erős és bátor kutya, aki mindig a gazdája mellett áll és védelmezi őt minden veszélytől.'),
(TRUE, 'kan', 'Lakó', 'kicsi', 'szürke', 2, 'Barátságos és életvidám kiskutya, aki mindig tele van energiával és jókedvvel.')

INSERT INTO gazdik (gazdinev, varos, utca, hazszam, telefonszam) VALUES
('Kiss Péter', 'Kecskemét', 'Sárga Krumpli', 22, '123456789'),
('Nagy Dominika', 'Budapest', 'Kék út', 5, '987654321'),
('Kovács János', 'Debrecen', 'Zöld tér', 10, '1122334455'),
('Nagy Márta', 'Budapest', 'Kék utca', 10, '987654321'),
('Kovács István', 'Debrecen', 'Zöld út', 15, '234567890'),
('Tóth Gábor', 'Szeged', 'Piros tér', 5, '345678901'),
('Horváth Éva', 'Miskolc', 'Narancs körút', 7, '456789012'),
('Varga Zoltán', 'Pécs', 'Rózsaszín sétány', 3, '567890123'),
('Farkas Katalin', 'Győr', 'Fehér utca', 12, '678901234'),
('Szabó János', 'Székesfehérvár', 'Kék sziget', 8, '789012345'),
('Kissné Tamás', 'Eger', 'Sárga fasor', 20, '890123456'),
('Tóthné Nagy', 'Nyíregyháza', 'Barna park', 14, '901234567'),
('Kovács Géza', 'Szombathely', 'Zöld liget', 18, '012345678'),
('Nagy Péter', 'Veszprém', 'Lila domb', 25, '123456789'),
('Kissné Kovács', 'Szolnok', 'Piros hegy', 30, '234567890'),
('Farkasné Varga', 'Békéscsaba', 'Fehér mező', 9, '345678901'),
('Tóth János', 'Kaposvár', 'Sárga dűlő', 16, '456789012'),
('Kovácsné Kiss', 'Érd', 'Kék téglalap', 19, '567890123'),
('Nagy Gábor', 'Sopron', 'Piros kör', 4, '678901234'),
('Kiss János', 'Dunaújváros', 'Barna út', 11, '789012345'),
('Tóthné Horváth', 'Százhalombatta', 'Zöld tér', 6, '890123456'),
('Nagy Zoltán', 'Hódmezővásárhely', 'Kék ház', 23, '901234567'),
('Kovácsné Szabó', 'Salgótarján', 'Sárga kert', 17, '012345678');


INSERT INTO orokbefogadas (allat_id, gazda_id, orokbefogadas_datum) VALUES
(1, 1, '2023-01-10'),
(3, 2, '2023-01-20'),
(2, 3, '2023-02-15'),
(4, 4, '2023-03-02'),
(6, 5, '2023-04-20'),
(8, 6, '2023-05-11'),
(10, 7, '2023-06-03'),
(12, 8, '2023-06-25'),
(14, 9, '2023-07-14'),
(16, 10, '2023-07-18'),
(15, 10, '2023-07-18'),
(18, 11, '2023-07-27'),
(20, 12, '2023-07-29'),
(22, 13, '2023-07-29'),
(24, 14, '2023-08-12'),
(11, 14, '2023-08-12'),
(26, 15, '2023-08-20'),
(28, 16, '2023-09-01'),
(30, 17, '2023-09-10'),
(32, 18, '2023-09-23'),
(23, 22, '2023-09-24'),
(34, 19, '2023-09-30'),
(36, 20, '2023-10-05'),
(38, 21, '2023-11-18'),
(25, 18, '2023-11-19'),
(40, 22, '2023-11-24'),
(43, 23, '2023-12-24');


INSERT INTO elozoev(honapok, osszallat, kutyak) VALUES
('Január', 5, 2),
('Február', 6, 5),
('Március', 2, 2),
('Április', 8, 6),
('Május', 4, 3),
('Június', 5, 4);