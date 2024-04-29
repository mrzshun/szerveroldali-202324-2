const { User, Post, Category } = require('../models');
const { Op } = require("sequelize");

(async () => {
    // console.log(await User.findAll());

    // console.log(await User.findByPk(1));

    // console.log(await User.findOne({
    //     attributes: ['id','email'],
    //     where: {
    //         email: {
    //             [Op.substring]: "hotmail"
    //         },
    //     }
    // }));

    // console.log(await Post.findOne({
    //     where: {
    //         [Op.and]: [
    //             {
    //                 UserId: 4,
    //             },
    //             {
    //                 title: {
    //                     [Op.substring]: 'a',
    //                 }
    //             }
    //         ]
    //     }
    // }));


    // console.log(await (await Post.findByPk(1)).getCategories());

    // console.log(
    //     JSON.stringify(
    //         await Post.findAll({
    //             include: [
    //                 {
    //                     model: Category,
    //                     // "as" tulajdonképpen nem kell, ha a models-ben nem adtunk meg alias-t
    //                 },
    //             ],
    //         }),
    //         // JSON.stringify testreszabása
    //         null,
    //         4
    //     )
    // );


    // Ugyanez, picit jobban testreszabva:
    // console.log(
    //     JSON.stringify(
    //         await Post.findAll({
    //             // A bejegyzésből csak az id, title és text mezők jelenjenek meg
    //             attributes: ["id", "title", "text"],
    //             // És a bejegyzés tartalmazza még...
    //             include: [
    //                 {
    //                     // ... a kategória modelt ...
    //                     model: Category,
    //                     // ... mint "Categories" alias ...
    //                     as: "Categories",
    //                     // ... és ezeket a mezőit kérje le:
    //                     attributes: ["id", "name"],

    //                     // Ez pedig azért kell, hogy a kapcsolótáblát ne szemetelje bele,
    //                     // a legjobb ha kikommentezed az alábbi sort és megnézed, mi változik
    //                     through: { attributes: [] },
    //                 },
    //             ],
    //         }),
    //         // JSON.stringify testreszabása
    //         null,
    //         4
    //     )
    // );

    console.log(
        JSON.stringify(
            await Post.findAll({
                // A bejegyzés minden mezőjét lekérjük, kivéve a timestamp-eket
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
                include: [
                    {
                        model: Category,
                        // Megköveteljük, hogy a szülőhöz tartozzon a gyerek (Post-hoz a Category, hiszen a Post-ra hívtuk a findAll-t)
                        required: true,
                        // Továbbá megmondjuk, hogy a gyerekből (Category) semmilyen mezőt nem akarunk látni, csak a bejegyzésre vagyunk kíváncsiak
                        attributes: [],
                        //through: { attributes: [] },
                    },
                ],
            }),
            // JSON.stringify testreszabása
            null,
            4
        )
    );   

}) ()
