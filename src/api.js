import axios from 'axios';
import state from './state';

/**
 * [根据code验证用户合法性]
 * @param  {String} options.verifyAppName [验证模块名称]
 * @param  {String} options.code          [企业微信code或者OA的code]
 * @param  {String} options.roleName      [模块权限名称]
 * @return {Object}                       [返回用户和token]
 */
export const verify = async ({ verifyAppName = '', code = '', roleName = '' }) => {
    try {
        const resp = await axios.get(`${state.authorize_url}${verifyAppName}?code=${code}&roleName=${roleName}`);
        const {
            headers,
            data
        } = resp;
        return {
            headers,
            data,
        }
    }catch(error) {
        throw error;
    }
}