module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    meetingRole: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    meetingDate: DataTypes.DATEONLY,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME
  }, {});

  Meeting.associate = function(models) {
    Meeting.hasMany(models.Member, {
      foreignKey: 'meetingRole',
      as: 'members'
    });
  };

  return Meeting;
};
