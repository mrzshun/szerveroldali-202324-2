https://fakerjs.dev/

https://github.com/szerveroldali/zh_kezdocsomag/blob/main/package.json

https://github.com/szerveroldali/leirasok/blob/main/SequelizeAsszociaciok.md

https://sequelize.org/api/v6/class/src/model.js~model
https://sequelize.org/docs/v6/core-concepts/model-querying-finders/


https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators

REST API - Category Model
Feladat: CRUD műveletek megvalósítása

GET - Read - /categories // mindegyik lekérdezése - done
             /categories/:id //egy kategória lekérdezése

POST - Create - /categories // egy új kategória létrehozása

PUT - Update - /categories/:id // módosítás, teljes objektum

PATCH - Update - /categories/:id // módosítás, csak a megadott mezők

DELETE - Delete - /categories // mindegyik törlése
                  /categories/:id // egy törlése

Fastify:
https://www.npmjs.com/package/fastify#quick-start
https://fastify.dev/
https://fastify.dev/docs/latest/Guides/Getting-Started/
https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/

https://regex101.com/


JWT
https://jwt.io/

jwt plugin installálása
https://www.npmjs.com/package/@fastify/jwt

jwt token generálása /login végponton

generált JWT token beküldése a requesttel együtt - Firecamp/Auth/Bearer-be másolás

minden végpont generálása onRequest hook-kal

fastify.authenticate decorator hozzáadása

who védett végpont létrehozása

Post / categories - védett végpont, de bárki aki authentikált elérheti

Feladat - gyakorlás
Post modellhez rest api készítés - minimum get, post, put
Get: bárki eléri
Post: védett végpont, authentikáltak hívhatják
Put: védett végpont, a poszt szerzője frissítheti a posztot
// Videóban feltesztem

GRAPHQL
https://graphql.org/





