import * as Yup from 'yup'

export const SignupSchema = Yup.object().shape({
	firstName: Yup.string().required('First Name is required'),
	lastName: Yup.string().required('Last Name is required'),
	email: Yup.string().required('Email is required').email('Invalid Email'),
	inviteCode: Yup.string(),
	password: Yup.string().required('Password is required'),
	passwordConfirm: Yup.string()
		.required('Confirm Password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

export const SigninSchema = Yup.object().shape({
	email: Yup.string().required('Email is required').email('Invalid Email'),
	password: Yup.string().required('Password is required'),
	passwordConfirm: Yup.string()
		.required('Confirm Password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
