export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter category'
      },
      unique: {
        args: true,
        msg: 'Category already exists'
      },
      validate: {
        isAlpha: {
          args: true,
          msg: 'Please enter a valid character'
        }
      }
    }
  });

  return Category;
};
