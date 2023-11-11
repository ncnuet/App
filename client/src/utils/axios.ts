import _axios from "axios";

export interface ResponseData {
    name: string;
    message: string;
}

const axios = _axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_HOST,
    validateStatus: (statusCode: number) => {
        return (statusCode === 200 || statusCode === 400 || statusCode === 401)
    }
})

export default axios;