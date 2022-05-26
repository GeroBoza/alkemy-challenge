module.exports = (sequelize, dataTypes) => {
    const User = sequelize.define(
        "User",
        {
            name: {
                type: dataTypes.STRING,
            },
            phone: {
                type: dataTypes.STRING,
            },
            email: {
                type: dataTypes.STRING,
            },
            password: {
                type: dataTypes.STRING,
            },
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.hasMany(models.Operation, {
            as: "operations",
            foreignKey: "user_id",
        });
        User.hasMany(models.Operation_category, {
            as: "operation_categories",
            foreignKey: "user_id",
        });
    };

    return User;
};
