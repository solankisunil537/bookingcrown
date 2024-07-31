import axios from "axios"
import Notification from "../utilities/Notification"

const baseUrl = process.env.REACT_APP_BACKEND_URL + "/auth"
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
        if (response.data) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}

export const login = async (email, password) => {
    try {
        const response = await axios.post(baseUrl + "/login", {
            email: email, password: password
        })
        return response.data
    } catch (error) {
        return error.data.message
    }
}