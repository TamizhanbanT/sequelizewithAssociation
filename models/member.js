module.exports = (sequelize, DataTypes) => {
  const Member = sequelize.define('Member', {
    name: DataTypes.STRING,
    meetingRole: DataTypes.STRING
  }, {});

  Member.associate = function(models) {
    Member.belongsTo(models.Meeting, {
      foreignKey: 'meetingRole',
      as: 'meeting'
    });
  };

  return Member;
};
