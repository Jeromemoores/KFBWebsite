import { toast } from 'react-toastify'

export const SuccessfullToast = (message) => {
	return toast.success(message, {
		position: 'bottom-right',
		autoClose: 2000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		theme: 'dark',
	})
}

export const ErrorToast = (message) => {
	return toast.error(message, {
		position: 'bottom-right',
		autoClose: 2000,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: false,
		theme: 'dark',
	})
}
