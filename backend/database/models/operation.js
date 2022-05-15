module.exports = (sequelize, dataTypes) => {
    const Operation = sequelize.define(
        "Operation",
        {
            concept: {
                type: dataTypes.STRING,
            },
            amount: {
                type: dataTypes.DECIMAL(10, 2),
            },
            date: {
                type: dataTypes.DATE,
            },
        },
        {
            tableName: "operations",
            timestamps: false,
        }
    );

    Operation.associate = (models) => {
        Operation.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id",
        });
        Operation.belongsTo(models.Operation_category, {
            as: "operation_category",
            foreignKey: "operation_category_id",
        });
        Operation.belongsTo(models.Operation_type, {
            as: "operation_type",
            foreignKey: "operation_type_id",
        });
    };

    return Operation;
};
