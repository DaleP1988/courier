module.exports = function(sequelize, DataTypes) {
    var Newtemps = sequelize.define("Newtemps", {
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
  
    return Newtemps;
};
  