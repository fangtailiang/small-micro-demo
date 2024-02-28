export default [
    {
      url: "/api/login",
      method: "post",
      response: (options) => {
        let token = btoa(options.body.encData)
        return {
            code: 200,
            message: "ok",
            data: {
              token,
              success:true}
          };
      }
    },{
        url: "/api/logout",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "ok",
                data: {
                success:true}
            };
        }
    }
  ];