import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

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
      path: '/guitarristas/buscar/:nom',
      name: 'guitarristas-busqueda-nombre',
      component: () => import('./pages/Guitarristas.vue')
    },
    {
      path: '/guitarristas/:id/unsuscribe',
      name: 'unsuscribe-user',
      component: () => import('./pages/Unsuscribe.vue')
    },
    {
      path: '/conciertos',
      name: 'conciertos',
      component: () => import('./pages/Conciertos.vue')
    },
    {
      path: '/conciertos/:id',
      name: 'conciertos-usuario',
      component: () => import('./pages/Conciertos.vue')
    },
    {
      path: '/conciertos/buscar/:titulo',
      name: 'concierto-busqueda-titulo',
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
      component: () => import('./pages/Edit-perfil.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.login) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/perfil/:id',
      name: 'perfil',
      component: () => import('./pages/Perfil.vue')
    },
    {
      path: '/programas',
      name: 'programas',
      component: () => import('./pages/Programas.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.login) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/cuenta',
      name: 'cuenta',
      component: () => import('./pages/Cuenta.vue'),
      beforeEnter: (to, from, next) => {
        if(store.state.login) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/unsuscribe',
      name: 'unsuscribe-newsletter',
      component: () => import('./pages/Unsuscribe.vue')
    },
    {
      path: '/terms-of-use',
      name: 'terms-of-use',
      component: () => import('./pages/Terms-of-use.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import('./pages/Privacy-policy.vue')
    },
    {
      path: '/screen2anchor',
      name: 'screen2anchor',
      redirect: { name: 'home' }
    },
    {
      path: '/*',
      name: 'page404',
      component: () => import('./pages/404.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // page scroll to top for all route navigations
    return { x: 0, y: 0 }
  }
})
