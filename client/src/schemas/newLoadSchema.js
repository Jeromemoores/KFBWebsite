import * as Yup from 'yup'

export const LoadSchema = Yup.object().shape({
	productWeight: Yup.string()
		.required('Product Weight is required')
		.matches(/^\d+$/, 'Product Weight must be a number'),
	productType: Yup.string().required('Product Type is required'),
	trailerType: Yup.string().required('Trailer Type is required'),
	hazmat: Yup.boolean().nullable().required('Hazmat selection is required'),
	pickupTime: Yup.string().required('Pickup Time is required'),
	pickupDate: Yup.date().required('Pickup Date is required'),
	securements: Yup.string().required('Securements are required'),
	requiredPictures: Yup.boolean().nullable().required('Required Pictures selection is required'),
	miles: Yup.number().required('Miles are required'),
	rate: Yup.number().required('Rate is required'),
	loadNumber: Yup.string().required('Load Number is required'),
	directions: Yup.string(),
	comments: Yup.string(),
	companyName: Yup.string().required('Company Name is required'),
	companyStreet: Yup.string().required('Company Street is required'),
	companySuite: Yup.string(),
	companyCity: Yup.string().required('Company City is required'),
	companyPostal: Yup.string().required('Company Postal is required'),
	companyState: Yup.string().required('Company State is required'),
	deliveryTime: Yup.string().required('Delivery Time is required'),
	deliveryDate: Yup.date().required('Delivery Date is required'),
	companyDirections: Yup.string(),
	companyComments: Yup.string(),
	available: Yup.boolean().required('Load Availability is required'),
})
