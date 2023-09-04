module.exports = (sequelize, DataTypes) => {
	const Accounts = sequelize.define('Accounts', {
		name: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		authId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		token: {
			type: DataTypes.STRING(),
		},
		ipAddress: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
		companyId: {
			type: DataTypes.INTEGER(),
			allowNull: true,
		},
		companyType: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
	})
	return Accounts
}
