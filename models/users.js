module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        googleUser: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        emailReqLink: {
            type: DataTypes.STRING,
        },
        bgimg: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        },
        img: {
            type: DataTypes.TEXT,
            validate: {
                len: [1]
            }
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Temps, {
            onDelete: "cascade"
        });
    };

    User.associate = function (models) {
        User.hasMany(models.MailGroup, {
            onDelete: "cascade"
        });
    };

    return User;
};
