import { createRouter, createWebHistory } from 'vue-router'
import Toppage from '../views/Toppage.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  {
    //トップページに設定
    path: '/',
    name: 'Toppage',
    component: Toppage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AboutView
  }
]



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


export default router
