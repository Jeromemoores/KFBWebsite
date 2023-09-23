module.exports = (sequelize, DataTypes) => {
	const Accounts = sequelize.define('Accounts', {
		name: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		authId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			unique: true,
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
		level: {
			type: DataTypes.INTEGER(),
			allowNull: false,
			defaultValue: 1,
		},
	})
	return Accounts
}
