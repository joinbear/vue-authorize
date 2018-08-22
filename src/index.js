import state from './state.js';
import { mutations } from './mutations.js';
import { actions } from './actions.js'


const commonStore = {
  state,
  mutations,
  actions
};

export default commonStore;