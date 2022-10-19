module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        phone: {
          type: DataTypes.STRING,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      { underscored: true }
    );
  
    return User;
  };
  