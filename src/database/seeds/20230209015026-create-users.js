const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert(
      'users', 
        [
          {
            name: 'Miller Santos',
            email: 'lucas.teste@teste.com',
            password_hash: await bcrypt.hash('123456', 8),
            created_at: new Date(),
            updated_at: new Date()
          },

          {
            name: 'Miller Santos 2',
            email: 'lucas.teste2@teste.com',
            password_hash: await bcrypt.hash('123456', 8),
            created_at: new Date(),
            updated_at: new Date()
          },
          
          {
            name: 'Miller Santos 3',
            email: 'lucas.teste3@teste.com',
            password_hash: await bcrypt.hash('123456', 8),
            created_at: new Date(),
            updated_at: new Date()
          },

          {
            name: 'Miller Santos 4',
            email: 'lucas.teste4@teste.com',
            password_hash: await bcrypt.hash('123456', 8),
            created_at: new Date(),
            updated_at: new Date()
          }
    ], 
    {});
  },

  async down (queryInterface, Sequelize) {
   
  }
};
