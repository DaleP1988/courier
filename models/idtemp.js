module.exports = function(sequelize, DataTypes) {
    var Idtemps = sequelize.define("Idtemps", {
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
        }
    });
  
    return Idtemps;
};