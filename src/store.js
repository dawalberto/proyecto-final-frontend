import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlBackend: 'https://clasicaguitarra-backend.herokuapp.com',
    // urlBackend: 'http://localhost:3000',
    // urlBackend: 'http://192.168.56.101:3000',
    user: {},
    login: false,
    token: null,
    pageIsMounted: false
  },
  getters: {
    userLoginStore: (state) => {
      return state.user
    }
  },
  mutations: {
    login: (state, user) => {
      state.user._id = user._id
      state.user.nomUsuario = user.nomUsuario
      state.user.img = user.img

      state.login = true
    },
    setTokenLogin: (state, token) => {
      state.token = token
    },
    logout: (state) => {
      state.user = {},
      state.login = false,
      state.token = null
    },
    pageIsMounted: (state) => {
      state.pageIsMounted = true
    }
  }
})
