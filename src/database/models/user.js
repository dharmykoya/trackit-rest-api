export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your first name'
      },
      validate: {
        isAlpha: {
          args: true,
          msg: 'Please enter a valid character'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your last name'
      },
      validate: {
        isAlpha: {
          args: true,
          msg: 'Please enter a valid character'
        }
      }
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please provide a logo'
      },
      defaultValue: 'https://via.placeholder.com/150'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter your email address'
      },
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email address'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: {
        args: true,
        msg: 'Please enter your phone number'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a password'
      }
    },
    threshold_amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: true
    },
    isNotified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    twitterHandle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebookHandle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    instagramHandle: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return User;
};
