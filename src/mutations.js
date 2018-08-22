import { TOAST_MESSAGE, SHOW_LOADING, SHOW_PROGRESS, CACHE_TOKEN, CACHE_USER, MODIFY_BREAD_CRUMB, AUTHORIZE_URI } from './type.js';
import localStorage from 'vue-localstorage';

export const mutations = {
  /**
   * [toast 显示错误信息]
   * @param  {Object} state     [state对象]
   * @param  {String} error_msg [错误信息]
   * @return {[type]}           [description]
   */
  [TOAST_MESSAGE] (state, message){
    state.error = message ? true : false;
    state.error_msg = message;
  },
  /**
   * [showLoading 阻止用户重复提交]
   * @param {Object} state     [state对象]
   * @param {Boolean} status   [网络请求状态]
   */
  [SHOW_LOADING] (state, status){
    state.isloading = status;
  },
  /**
   * [showLoadingBar 显示loading进度bar]
   * @param  {Object} state   [state对象]
   * @param  {Boolean} status [是否显示loadingbar]
   * @return {[type]}         [description]
   */
  [SHOW_PROGRESS] (state, status){
    state.loading_bar = status;
  },
  /**
   * [cacheToken 设置授权token]
   * @param {Object} state     [state对象]
   * @param {String} token     [合法的token值]
   */
  [CACHE_TOKEN] (state, token){
    state.token = token;
    localStorage.setSession('token',token);
  },
  /** 
   * [cacheUser 设置用户的工号]
   * @param  {Object} state     [state对象]
   * @param  {String} user      [用户信息]
   */
  [CACHE_USER] (state, user){
    state.user = user;
    localStorage.setSession('user',user);
  },
  /**
   * 修改导航
   */
  [MODIFY_BREAD_CRUMB] (state, bread_crumb){
    state.bread_crumb = bread_crumb;
  },
  /**
   * 授权地址
   */
  [AUTHORIZE_URI] (state, authorize_url) {
    state.authorize_url = authorize_url;
  }
};

