import Notification from "../utilities/Notification"
import axiosInstance from "../services/axiosInstance/AxiosInstance"

export const createTableList = async (values) => {
    try {
        const response = await axiosInstance.post("/createTableList", values)
        if (response.data) {
            Notification.success(response.data.message)
        }
        return response.data
    } catch (error) {
        Notification.error(error.response.data.message)
        return error
    }
}