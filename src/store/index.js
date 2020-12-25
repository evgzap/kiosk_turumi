import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nameTitle:"Turumi",
    basket:[],
    loadSite:true
  },
  mutations: {
    
  },
  actions: {
    setNewTitle(title){
      state.nameTitle =  "Turumi | " +title;
    }
  },
  modules: {
  }
})
