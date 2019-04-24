import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // urlBackend: 'https://clasicaguitarra-backend.herokuapp.com',
    // urlBackend: 'http://localhost:3000',
    urlBackend: 'http://192.168.56.101:3000',
    user: {},
    login: false,
    token: null
  },
  getters: {
    userLoginStore: (state) => {
      return state.user
    }
  },
  mutations: {
    login: (state, user) => {
      state.user._id = user._id
      // state.user.email = user.email
      state.user.nomUsuario = user.nomUsuario
      // state.user.estado = user.estado
      // state.user.nombre = user.nombre
      // state.user.apellidos = user.apellidos
      // state.user.sexo = user.sexo
      // state.user.nacionalidad = user.nacionalidad
      // state.user.biografia = user.biografia
      // state.user.fechaNac = user.fechaNac
      // state.user.guitarra = user.guitarra
      state.user.img = user.img
      // state.user.webpage = user.webpage
      // state.user.redes = user.redes
      // state.user.rol = user.rol
      // state.user.google = user.google
      // state.user.fechaRegistro = user.fechaRegistro
      
      state.login = true
    },
    setTokenLogin: (state, token) => {
      state.token = token
    },
    logout: (state) => {
      state.user = {},
      state.login = false,
      state.token = null
    }
  },
  actions: {
    getImage(context, img) {

      return new Promise((resolve, reject) => {

        axios.get(`${ context.state.urlBackend }/imagenes/imgusuarios/${ img }`, {
            responseType: 'blob'
        })
            .then((res) => {
                let reader = new FileReader()
                reader.readAsDataURL(res.data)
                reader.onload = function() {
                    let url = reader.result
                    resolve(url)
                }
            })
            .catch((err) => {
                console.log('error imagen ', err)
                reject()
            })

      })

    }
  }
})
