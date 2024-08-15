import axios from "axios"
import Notification from "../utilities/Notification"

const baseUrl = process.env.REACT_APP_BACKEND_URL
export const signup = async (name, mobilenu, email, businessType, businessName, address) => {
    try {
        const response = await axios.post(baseUrl + "/signup", {
            name: name,
            mobilenu: mobilenu,
            email: email,
            businessType: businessType,
            businessName: businessName,
            address: address
        })
        return response.data
    } catch (error) {
        console.log(error)
        // Notification.error(error.response.data.message)
        return error
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(baseUrl + "/login", {
            email: email, password: password
        })
        if (response.data.success) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error.response.data.message
    }
}

export const changePassword = async (data) => {
    try {
        const response = await axios.put(baseUrl + "/changePassword/66ae53bd1792bc4c86458f6c", data)
        if (response.data) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error.response.data.message
    }
}
