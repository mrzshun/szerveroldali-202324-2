https://sqlitebrowser.org/
vagy
SQLite Viewer VSCode add-on by Floran Klampfer

CRUD műveletek: Create, Read, Update, Delete


Blog
Modellek:
    Post: posztok, tartozhat hozzájuk kép
    Category: kategóriák, tagként működnek, tehát egy poszt több kategóriához is tartozhat, hierarchia nincs közöttük
    User: beépített Laraveles userek, ők írhatnak posztokat ha beléptek, saját posztot lehet editálni / törölni
    Comment: kommentek // h.f.

Migrations:
https://laravel.com/docs/10.x/migrations
https://laravel.com/docs/10.x/migrations#column-modifiers

Mezők:
Post:
    title
    description
    text
    hidden
    author
Category: 
    name
    bg_color
    txt_color

Modellek közötti kapcsolatok

1-1: egy rekordhoz pontosen egy db másik rekord kapcsolódik
pl: személy és személyi igazolvány
mindkét rekordban id hivatkozás a másik rekordra

1-N: egy rekordhoz több másik tartozik
pl: személy és email inbox - egy személynek lehet több inboxa, de egy inbox egyértelműen egyetlen valakihez tartozik
a kapcsolt N multiplicitású rekordban tároljuk ID-val, azt, hogy az melyik (1 multiplicitású) rekordhoz tartozik

N-N
pl: személy és ingatlan, egy személynek több ingatlana lehet, de egy ingatlannak lehet több tulajdonosa
kapcsolótáblával lehet implementálni, amiben id párok vannak, pl:
[5,10]: az 5-ös user tulajdonlja a 10-es ingatlant
[5,11]: az 5-ös user tulajdonlja a 11-es ingatlant
[6,10]: az 6-os user tulajdonlja a 10-es ingatlant
Lehetnek benne kiegészítő adatok is!
[5,10,0.5]: az 5-ös user tulajdonlja a 10-es ingatlant 50%-ban
[5,11,1]: az 5-ös user tulajdonlja a 11-es ingatlant 100%-ban
[6,10,0.5]: az 6-os user tulajdonlja a 10-es ingatlant 50%-ban

Feladat:
1. User-Post közötti 1-N kapcsolat implementálása 
2. Post-Category közötti N-N kapcsolat implementálása

https://laravel.com/docs/10.x/eloquent-relationships#main-content

Note: projekt letöltése és telepítése
1. git clone git@github.com:mrzshun/szerveroldali-202324-2.git
2. csomagok telepítése
    composer install
3. .env fájl létrehozása üresen, átmásolni mindent a .env.example-ből
    db connection-t ellenőrizni, sqlite legyen! - én most átírom a .env.example-ben is, tehát nem kell csinálni semmit
4. alkalmazáskulcs generálása
    php artisan key:generate
5. webszerver elindítás 
    php artisan serve


https://github.com/szerveroldali/blog_basic_assets

