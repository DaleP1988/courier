module.exports = function(sequelize, DataTypes) {
    var MailList = sequelize.define("MailList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
  
    MailList.associate = function(models) {
        MailList.belongsTo(models.MailGroup, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return MailList;
};