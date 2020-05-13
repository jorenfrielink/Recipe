import {createClient} from '../../plugins/contentful';
const contentfulClient = createClient();
export const state = {
  navItems: null
};
    
export const mutations = {
  setMenuItems(state, data) {
    state.navItems = data;
  }
};
    
export const actions = {
  getPageItems({commit}) {
    contentfulClient.getEntries({
      'content_type': page,
      order: '-sys.createdAt'
    }).then((page) => {
      if (page) {
        const navItems = page.items;
        commit('setMenuItems', navItems);
      }
    }).catch((err) => {
      console.log("error", err);
    });
  }
};
    
export default {
  state,
  mutations,
  actions,
};