import SichuanProvinceMap from "../data/SichuanProvince.map";
export default [
    {
        url:'/api/sichuan/map',
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                    data:SichuanProvinceMap,
                    success:true
                }
            };
        }
    }
]