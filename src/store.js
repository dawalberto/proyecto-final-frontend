import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlBackend: 'https://clasicaguitarra-backend.herokuapp.com',
    // urlBackend: 'http://localhost:3000',
    // urlBackend: 'http://192.168.56.101:3000',
    user: {},
    login: false,
    token: null,
    pageIsMounted: false,
    iconSearchBar: 'fas fa-user'
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
    },
    changeIconSearchBar: (state, route) => {
      route === 'guitarristas' ? state.iconSearchBar = 'fas fa-user' : state.iconSearchBar = 'fas fa-music'
    }
  }
})
