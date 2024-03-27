Blog feladat
Modellek - adatok amikkel dolgozunk
    Posztok
    Kategóriák
    Userek
    // Commentek - gyakorlás / hf

Belépett userek írhatnak posztokat
Egy posztnak vannak kategóriái, több is
Egy kategóriába több poszt tartozhat

User szerkesztheti a saját blogposztjait

A blogposztokat tudjuk listázni és meg tudjuk nézni

A posztokhoz kép csatolható

1. lépés:
Adatmodellek és azok közötti kapcsolat
User - Post: 1-n
Post - Category: n-n
Post - Comment: 1-n
User - Comment: 1-n

Migrációk
php artisan migrate - lefuttatja az összeset
php artisan migrate:rollback - legutóbbi migráció visszavonása
php artisan migrate:reset - minden valaha futtatott migráció visszavonása
php artisan list

Category: (tagekként gondolunk rájuk)
- name: neve
- txt_color: szöveg színe
- bg_color: háttérszín

Post:
- title: cím
- description: bevezető / összefoglaló
- text: a poszt szövege
- hidden: rejtett, logikai érték, ha true akkor nem jelenik meg
- szerző: user_id-ra hivatkozik a user modelben, később

Factory létrehozása, majd alap seederek, amik generálnak Post-ból és Category-ből 10-10 darabot.
faker használata

Modellek közötti kapcsolatok létrehozása
Milyen kapcsolataink vannak a fentiek alapján

Milyenek lehetnek?
1-1 mindkét tábla ID-val hivatkozik a másikra
személy - személyi igazolvány

1-N a kapcsolt tábla ID-val hivatkozik a szülőre
személy - blogposzt // szerző
blogposzt táblában id, ami megmondja, hogy ki a szerzője

N-N kapcsolótáblában tartjuk nyilván az asszociációkat
személy - ingatlan // tulajdonlás
kapcsolótáblában id párok
[5,10] - 5-ös user tulajdonosa a 10-es ingatlannak
[5,11] - 5-ös user tulajdonosa a 11-es ingatlannak
[6,10] - 6-os user tulajdonosa a 10-es ingatlannak
kiegészíthető, ehhez is lehet modelt csinálni
[5,10,0.5] - 5-ös user tulajdonosa a 10-es ingatlannak 50%-ban
[5,11,1.0] - 5-ös user tulajdonosa a 11-es ingatlannak 100%-ban
[6,10,0.5] - 6-os user tulajdonosa a 10-es ingatlannak 50%-ban

http://webprogramozas.inf.elte.hu/#!/subjects/webprog-server/handouts/laravel-04-rel%C3%A1ci%C3%B3k
https://laravel.com/docs/10.x/eloquent-relationships#one-to-many

Seedelés kapcsolatokkal együtt

Laravel alkalmazás telepítése:
1. Git clone utasítással telepítés, kimásolva az URL-t a Githubról
    git clone git@github.com:mrzshun/szerveroldali-202324-2.git
2. Composerrel a szükséges package-ek telepítése a laravel-blog könyvtár gyökerében
    composer install
3. .env fájl létrehozása, minden átmásolása a .env.example fájlból, DE az adatbázisnál figyeljünk, hogy sqlite legyen.
    még nem fog menni az alkalmazás, mert: "APP_KEY=" sor van
4. Alkalmazáskulcs generálása
    php artisan key:generate
5. Webszerver elindítása
    php artisan serve

Frontend

https://lodash.com/
https://axios-http.com/docs/intro
https://getbootstrap.com/docs/5.0/getting-started/introduction/ 

CSRF támadás, CSRF Laravel direktíva
https://owasp.org/www-community/attacks/csrf
https://laravel.com/docs/10.x/csrf


Validáció
https://laravel.com/docs/10.x/validation
https://laravel.com/docs/10.x/validation#available-validation-rules

Bootstrap validáció

https://getbootstrap.com/docs/5.0/forms/validation/