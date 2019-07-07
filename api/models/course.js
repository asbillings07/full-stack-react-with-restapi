'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define(
    'Course',
    {
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'User must be present',
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Course Title Required',
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: 'Course Description Required',
          },
        },
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
    },
    {}
  );
  Course.associate = models => {
    Course.belongsTo(models.User, {
      as: 'user',
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };
  return Course;
};
