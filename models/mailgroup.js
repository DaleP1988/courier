module.exports = function(sequelize, DataTypes) {
    var MailGroup = sequelize.define("MailGroup", {
        lable: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
  
    MailGroup.associate = function(models) {
        MailGroup.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    MailGroup.associate = function(models) {
        MailGroup.hasMany(models.MailList, {
            onDelete: "cascade"
        });
    };
  
    return MailGroup;
};