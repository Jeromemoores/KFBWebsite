module.exports = (sequelize, DataTypes) => {
	const Companies = sequelize.define('Companies', {
		name: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		type: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		address: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		contact: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		authCode: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		additionalInformation: {
			type: DataTypes.JSON(),
			allowNull: true,
		},
		employees: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
	})
	return Companies
}
