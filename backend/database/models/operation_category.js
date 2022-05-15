module.exports = (sequelize, dataTypes) => {
    const Operation_category = sequelize.define(
        "Operation_category",
        {
            name: {
                type: dataTypes.STRING,
            },
        },
        {
            tableName: "operation_categories",
            timestamps: false,
        }
    );

    Operation_category.associate = (models) => {
        Operation_category.hasMany(models.Operation, {
            as: "operations",
            foreignKey: "operation_category_id",
        });
    };

    return Operation_category;
};
