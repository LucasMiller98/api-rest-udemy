module.exports = { // Editando a coluna de email
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'students', // tabela
      'email', // coluna
      { 
        type: Sequelize.STRING,
        allowNull: false,
        unique: true 
      }
    );
  },

  async down () {}
};
