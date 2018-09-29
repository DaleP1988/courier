module.exports = function(sequelize, DataTypes) {
    var Temps = sequelize.define("Temps", {
        lable: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        template: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "default"
        },
    });
  
    Temps.associate = function(models) {
        Temps.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
  
    return Temps;
};
  