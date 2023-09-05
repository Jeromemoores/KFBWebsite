module.exports = (sequelize, DataTypes) => {
	const Loads = sequelize.define('Loads', {
		companyId: {
			type: DataTypes.INTEGER(),
			allowNull: false,
		},
		loadNumber: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		loadInformation: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		pickupLocation: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		pickupDetails: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		deliveryDetails: {
			type: DataTypes.JSON(),
			allowNull: false,
		},
		loadLog: {
			type: DataTypes.JSON(),
		},
		available: {
			type: DataTypes.STRING(),
			allowNull: false,
		},
		loadStatus: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
		claimedBy: {
			type: DataTypes.JSON(),
			allowNull: true,
		},
		claimedOn: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
		claimerStatus: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
		trackingNumber: {
			type: DataTypes.STRING(),
			allowNull: true,
		},
		paid: {
			type: DataTypes.JSON(),
			allowNull: false,
			defaultValue: { broker: false, carrier: false },
		},
	})
	return Loads
}
