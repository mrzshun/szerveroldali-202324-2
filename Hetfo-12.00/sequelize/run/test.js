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


    console.log(await (await Post.findByPk(1)).getCategories());
}) ()
