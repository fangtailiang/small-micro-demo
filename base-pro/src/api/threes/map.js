import axios from '@/lib/axios';

export const getMap = () => {
    let option = {
        url: '/api/sichuan/map',
        method: "get"
    }
    return axios.request(option)
}