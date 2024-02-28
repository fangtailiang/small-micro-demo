import axios from '@/lib/axios';

export const getMenus = () => {
    let option = {
        url: `/api/getmenus`,
        method: "get"
    }
    return axios.request(option)
}