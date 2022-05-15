module.exports = (sequelize, dataTypes) => {
    const Operation_type = sequelize.define(
        "Operation_type",
        {
            name: {
                type: dataTypes.STRING,
            },
        },
        {
            tableName: "operation_types",
            timestamps: false,
        }
    );

    Operation_type.associate = (models) => {
        Operation.belongsToMany(models.Operation, {
            as: "operations",
            foreignKey: "operation_type_id",
        });
    };

    return Operation_type;
};
