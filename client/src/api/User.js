import axiosInstance from "../services/axiosInstance/AxiosInstance"

const baseUrl = process.env.REACT_APP_BACKEND_URL
export const getUserData = async () => {
    try {
        const response = await axiosInstance.get(baseUrl + "/getUserData/")
        return response.data.data
    } catch (error) {
        return error
    }
}