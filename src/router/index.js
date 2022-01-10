import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '../views/Post.vue'
import Detallepost from '@/components/Detallepost.vue'
import store from "@/store"

Vue.use(VueRouter)

const routes = [ 
  
  {
    path: '/',
    name: 'Logeo',
    component: () => import(/* webpackChunkName: "Logeo" */ '../views/Logeo.vue')
  },  
  {
    path: '/Post',
    name: 'Post',
    component: Post, 
    beforeEnter: (to, from, next) => { 
      if (store.state.user == null) {
        next('/');
      }
      next()
      
    },
  },
  {
    path: '/Detallepost',
    name: 'Detallepost',
    component: Detallepost,
    beforeEnter: (to, from, next) => { 
      if (store.state.user == null) {
        next('/');      
      }
      else{
        next('/Post')
      }
    },
  },
  {
    path: '*',
    name: 'comodin',
    redirect: "/",
    beforeEnter: (to, from, next) => { 
      if (store.state.user == null) {
        next('/');      
      }
      else{
        next('/Post')
      }
    },
    
  }

]
const router = new VueRouter({
  mode:'history',
  routes
})



export default router
