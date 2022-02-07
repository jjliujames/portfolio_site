import { createStore } from 'vuex'

export default createStore({
  state: {
    selected_city: 'All',
    chartdata: {}
  },
  mutations: {

    setCity(state, city) {
      state.selected_city = city
    },
    setChartData(state, data) {
      state.chartdata = data
    }
  },
  actions: {
  },
  modules: {
  }
})
