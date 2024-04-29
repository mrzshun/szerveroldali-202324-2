'use strict';

const { User, Post, Category } = require('../models');
const { faker } = require('@faker-js/faker');
const md5 = require('md5');
const category = require('../models/category');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const userNum = faker.number.int({
        min: 5,
        max: 10,
      });

      const users = [];

      for (let i = 0; i < userNum; i++) {
        users.push(
          await User.create({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: md5("password"),
          })
        );
      }

      const postNum = faker.number.int({
        min: 10,
        max: 15,
      });

      const posts = [];
      for (let i = 0; i < postNum; i++) {
        const user = faker.helpers.arrayElement(users);
        posts.push(
          await user.createPost({
            title: faker.lorem.sentence(3).slice(0, -1),
            description: faker.lorem.sentences(2),
            text: faker.lorem.paragraphs(3),
          })
        );
      }

      const catNum = faker.number.int({
        min: 5,
        max: 10,
      });

      const categories = [];
      for (let i = 0; i < catNum; i++) {
        categories.push(
          await Category.create({
            name: faker.lorem.word(),
            color: faker.internet.color(),
          })
        );
      }

      for(const post of posts) {
        let postCat = faker.helpers.arrayElements(
          categories,
          faker.number.int({
            min: 0,
            max: catNum,
          })
        );
        await post.setCategories(postCat);
      }


    }
    catch (error) {
      console.log("Error in seeding!");
      console.log(error);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
