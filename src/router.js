import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home.vue')
    },
    {
      path: '/guitarristas',
      name: 'guitarristas',
      component: () => import('./pages/Guitarristas.vue')
    },
    {
      path: '/conciertos',
      name: 'conciertos',
      component: () => import('./pages/Conciertos.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./pages/Login.vue')
    },
    {
      path: '/registro',
      name: 'registro',
      component: () => import('./pages/Registro.vue')
    },
    {
      path: '/edit-perfil',
      name: 'edit-perfil',
      component: () => import('./pages/Edit-perfil.vue')
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('./pages/Perfil.vue')
    }
  ]
})
