import { TOAST_MESSAGE, CACHE_TOKEN, CACHE_USER  } from './type.js';
import { verify } from './api.js';

export const actions = {
    /**
     * [verify 验证code合法性，跳转路由]
     * @param  {[type]} options.commit       [context.commit]
     * @param  {[type]} options.state        [context.state]
     * @param  {String} options.appName      [应用名称或者模块名称]
     * @param  {String} options.code         [企业微信code或者OA的code]
     * @param  {String} options.user         [user]
     * @param  {String} options.authorize    [授权token的键名]
     * @param  {String} options.routerName   [路由名称，驼峰格式]
     * @param  {Object} options.routerParams [路由URI参数]
     * @param  {Object} routerQuery          [路由query参数]
     * @param  {String} verifyName           [验证token应用名称，由于多个模块可能挂载同一个应用下面]
     * @param  {String} roleName             [权限名称，验证权限时需要]
     * @param  {Object} $router              [Vue.$router对象]
     * @return {[type]}                      [description]
     */
    async verify({ commit, state }, { appName = "", code = "", user = 'data' ,authorize = "authorization" , routerName = "", routerParams = {}, routerQuery = {}, verifyName= "", roleName= "", $router= {} }) {
        const returnVal = {
            data: ''
        };
        if(!appName){
            commit(TOAST_MESSAGE,'appName is required!');
            return returnVal;
        }
        const verifyAppName = verifyName ? verifyName : appName;
        
        // 根据传递参数路由重定向
        const redirect = ()=>{
            $router.push({
                name: routerName,
                params: routerParams,
                query: routerQuery
            });
        }
        if(!code){
            redirect();
            return returnVal;
        }
        try {
            const params = {
                verifyAppName,
                code,
                roleName
            };
            const { headers, data } = await verify(params);
            commit(CACHE_USER,data[user]);
            if(headers[authorize]){
                commit(CACHE_TOKEN,headers[authorize]);
                return {
                    data,
                    redirect,
                }
            }else{
                commit(TOAST_MESSAGE,'授权失败！');
                return returnVal;
            };
        }catch(error) {
            commit(TOAST_MESSAGE,error.message);
            return returnVal;
        }
    }

};