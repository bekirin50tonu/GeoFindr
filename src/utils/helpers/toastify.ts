import { Slide, toast } from 'react-toastify'

// Function to show success toast notification
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
  })
}

// Function to show error toast notification
export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    transition: Slide,
  })
}
