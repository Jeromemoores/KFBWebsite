module.exports = (sequelize, DataTypes) => {
	const Auth = sequelize.define('Auth', {
		creator: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		code: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
		},
		used: {
			type: DataTypes.STRING(),
			allowNull: false,
			defaultValue: 'false',
		},
	})
	return Auth
}
