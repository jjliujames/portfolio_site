import { createStore } from 'vuex'

export default createStore({
  state: {
    selected_city: 'All'
  },
  mutations: {

    setCity(state, city) {
      state.selected_city = city
    }
  },
  actions: {
  },
  modules: {
  }
})
