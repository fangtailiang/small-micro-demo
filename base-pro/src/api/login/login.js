import axios from '@/lib/axios';

export const login = (data) => {
    let option = {
        url: `/api/login`,
        method: "post",
        data: data
    }
    return axios.request(option)
}

export const logout = () => {
    let option = {
        url: `/api/logout`,
        method: "get"
    }
    return axios.request(option)
}