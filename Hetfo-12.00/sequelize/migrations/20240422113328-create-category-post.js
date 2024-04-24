'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("CategoryPost", {
      // ID mező, ugyanaz, mint bármelyik másik generált modellnél
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // Kategória ID, Bejegyzés ID
      // Kategória ID, Bejegyzés ID
      CategoryId: {
        type: Sequelize.INTEGER,
        // Nem vehet fel NULL értéket, mindenképpen valamilyen INTEGER-nek kell lennie
        allowNull: false,
        // Megadjuk, hogy ez egy külső kulcs, ami a "Categories" táblán belüli "id"-re hivatkozik
        // https://sequelize.org/master/class/lib/dialects/abstract/query-interface.js~QueryInterface.html#instance-method-createTable
        references: {
          model: "Categories",
          key: "id",
        },
        // Ha pedig a kategória (Category) törlődik, akkor a kapcsolótáblában lévő bejegyzésnek is törlődnie kell,
        // hiszen okafogyottá válik, hiszen egy nem létező kategóriára hivatkozik
        onDelete: "cascade",
      },
      PostId: {
        type: Sequelize.INTEGER,
        // Nem vehet fel NULL értéket, mindenképpen valamilyen INTEGER-nek kell lennie
        allowNull: false,
        // Megadjuk, hogy ez egy külső kulcs, ami a "Posts" táblán belüli "id"-re hivatkozik
        references: {
          model: "Posts",
          key: "id",
        },
        // Ha pedig a bejegyzés (Post) törlődik, akkor a kapcsolótáblában lévő bejegyzésnek is törlődnie kell,
        // hiszen okafogyottá válik, hiszen egy nem létező kategóriára hivatkozik
        onDelete: "cascade",
      },
      // Időbélyegek
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Megkötés a kapcsolótáblára, amelyben megmondjuk, hogy egy CategoryId - PostId páros csak egyszer szerepelhet a kapcsolótáblában
    await queryInterface.addConstraint("CategoryPost", {
      fields: ["CategoryId", "PostId"],
      type: "unique",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("CategoryPost");
  }
};
