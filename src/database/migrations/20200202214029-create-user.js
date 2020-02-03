module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      threshold_amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isNotified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      about: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      facebookHandle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      twitterHandle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      instagramHandle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        default: Sequelize.NOW
      }
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Users');
  }
};
