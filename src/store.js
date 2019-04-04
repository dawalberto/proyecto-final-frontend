import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    urlBackend: 'http://localhost:3000',
    user: {},
    login: false,
    token: null
  },
  mutations: {
    login: (state, user) => {
      state.user.id = user._id
      state.user.email = user.email
      state.user.nomUsuario = user.nomUsuario
      state.user.estado = user.estado
      state.user.nombre = user.nombre
      state.user.apellidos = user.apellidos
      state.user.sexo = user.sexo
      state.user.nacionalidad = user.nacionalidad
      state.user.biografia = user.biografia
      state.user.fechaNac = user.fechaNac
      state.user.guitarra = user.guitarra
      state.user.img = user.img
      state.user.webpage = user.webpage
      state.user.redes = user.redes
      state.user.rol = user.rol
      state.user.google = user.google
      state.user.fechaRegistro = user.fechaRegistro
      
      state.login = true
    },
    setTokenLogin: (state, token) => {
      state.token = token
    }
  },
  actions: {

  }
})
