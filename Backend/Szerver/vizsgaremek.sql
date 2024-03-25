CREATE DATABASE mancsallatmenhely default character set 'utf8' COLLATE utf8_hungarian_ci;
use mancsallatmenhely;

CREATE TABLE allatok (
    id INT PRIMARY KEY AUTO_INCREMENT,
    kutyacica BOOLEAN,
    ivar BOOLEAN,
    neve VARCHAR(255),
    termete VARCHAR(255),
    szine VARCHAR(255),
    kora INT,
    leiras VARCHAR(255),
    nyomonkovetesid INT
);


CREATE TABLE gazdik (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nev VARCHAR(255),
    varos VARCHAR(255),
    utca VARCHAR(255),
hazszam INT
);

CREATE TABLE nyomonkovetes (
    dbid INT PRIMARY KEY AUTO_INCREMENT,
    gazdaid INT,
    allatokid INT,
    FOREIGN KEY (gazdaid) REFERENCES gazdik(id),
    FOREIGN KEY (allatokid) REFERENCES allatok(id)
);

CREATE TABLE Felhasznalok (
    FelhasznaloID INT PRIMARY KEY AUTO_INCREMENT,
    FelhasznaloNev VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Jelszo VARCHAR(50) NOT NULL
);

CREATE TABLE FelhasznaloJogosultsagok (
    JogosultsagID INT PRIMARY KEY AUTO_INCREMENT,
    JogosultsagNev VARCHAR(50) NOT NULL
);



CREATE TABLE FelhasznaloJogosultsagokKapcsolo (
    FelhasznaloJogosultsagokKapcsoloID INT PRIMARY KEY AUTO_INCREMENT,
    FelhasznaloID INT,
    JogosultsagID INT,
    FOREIGN KEY (FelhasznaloID) REFERENCES Felhasznalok(FelhasznaloID),
    FOREIGN KEY (JogosultsagID) REFERENCES FelhasznaloJogosultsagok(JogosultsagID)
);


INSERT INTO Felhasznalok (FelhasznaloNev, Email, Jelszo)
VALUES ('admin', 'admin@teszt.hu', 'admin123');


INSERT INTO FelhasznaloJogosultsagok (JogosultsagNev)
VALUES ('Admin');

INSERT INTO FelhasznaloJogosultsagokKapcsolo (FelhasznaloID, JogosultsagID)
SELECT FelhasznaloID, JogosultsagID FROM Felhasznalok CROSS JOIN FelhasznaloJogosultsagok
WHERE FelhasznaloNev = 'admin' AND JogosultsagNev = 'Admin';


Insert into allatok(id,kutyacica,ivar,neve,termete,szine,kora,leiras,nyomonkovetesid)values

(1,"cica","SZUKA ","Gombóc","kicsi","fehér",1,"Még visszahúzódó, félénk egy kicsit, de egy nyugodt otthonban, egy türelmes gazdi mellett hamar ki tudna nyílni.",1),
(2,"cica","KANDÚR  ","nudli","kicsi","foltos",1,"Barátkozós, kedves bársonytalpú. Szinte azonnal barátságot köt mindenkivel, akivel találkozik. Kezdő cicásoknak is ajánljuk.",2),
(3,"cica","SZUKA ","Coco","kicsi","cirmos",1,"Bekuckózós bajnokunk, rendszerint a takaró alá bújik és a napja nagy részét ott tölti. Biztos, hogy egy nyugodt otthonban sokkal többet lenne szem előtt. ",3),
(4,"cica","SZUKA ","Vivien","kicsi","cirmos",2,"Barátkozós, kedves bársonytalpú. Szinte azonnal barátságot köt mindenkivel, akivel találkozik. Kezdő cicásoknak is ajánljuk.",4),
(5,"cica","KANDÚR  ","Milka","kicsi","FEKETE-FEHÉR",1,"Az azonnal barátkozós cicák közé tartozik. Bemegyünk hozzájuk és folyton a nyomunkban van. Azonnal barátságot köt a látogatókkal.",5);


Insert into allatok(id,kutyacica,ivar,neve,termete,szine,kora,leiras,nyomonkovetesid)values

(6,"kutya","KAN ","Kópé","közepes","tigris",3,"Kis termetű és igazán tekintélyt parancsoló kiállású kutya. Nem rögtön, de pár alkalom után már bújik egy kis simogatásért a nagy buksi fejével.",6),
(7,"kutya","KAN ","Bosco","nagy","fekete-fehér",10,"Bundás kuvasz keverék, pici bogárszemekkel, melyekből árad a szomorúság. Mintha tudná, hogy kevés az esélye gazdisodni. 10 éves elmúlt, nagyobb termetű, hosszú szőrű és mindennek a tetejébe még kissé bátortalan is.",7),
(8,"kutya","KAN  ","Rudi","nagy","zsemle",2,"Még visszahúzódó, félénk egy kicsit, de egy nyugodt otthonban, egy türelmes gazdi mellett hamar ki tudna nyílni.",8),
(9,"kutya","SZUKA  ","Ramida","közepes","fekete-cser",2,"RAMIDA egy nagyon kedves, 2 év körüli rottweiler kislány. Imádja és keresi az emberek társaságát, ha pedig beszélgetsz vele, ő vicces vonyító hangon válaszol.",9),
(10,"kutya","SZUKA ","Bella","közepes","zsemle",6,"Messziről indultunk vele, mivel gazdái halála után a menhelyi környezet idegen volt a számára, nagy váltás volt a paplan melegéből a rideg menhelyi kennel, így nagyon bezárkózott.",10);

Insert into gazdik(id,nev,varos,utca,hazszam)values
(1,"Kiss Péter","Kecskemét","Sárga Krumpli",22),
(2,"Ábelesz Kábelesz","Szolnok","Kék Erdő",37);

Insert into nyomonkovetes(dbid,gazdaid,allatokid)values
(1,1,4),
(2,2,7);
