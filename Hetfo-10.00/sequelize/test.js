const { User, Post, Category } = require('./models');
const { Op } = require("sequelize");

(async () => {
    // console.log(await Post.findAll());
    // console.log(await User.findOne({
    //     where: {
    //         name: "Dwayne Johnston IV",
    //     }
    // }));
    // console.log(await Post.findOne({
    //     where: {
    //         [Op.and]: [
    //             {
    //                 UserId: 1
    //             },
    //             {
    //                 title: {
    //                     [Op.substring]: 'Desparatus'
    //                 }
    //             }
    //         ]
    //     }
    // }));

})()