import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasetInfo: {},
    pluginInfo: {},
    isPluginShow: false
  },
  mutations: {
    setDatasetInfo (state, datasetInfo) {
      state.datasetInfo = datasetInfo
    },
    setPluginInfo (state, pluginInfo) {
      state.pluginInfo = pluginInfo
    },
    setIsPluginShow (state, isPluginShow) {
      state.isPluginShow = isPluginShow
    }
  },
  actions: {
  },
  modules: {
  }
})
