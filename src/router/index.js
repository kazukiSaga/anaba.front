import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '../views/Toppage.vue'
import AboutView from '../views/AboutView.vue'
import Usercreate from '../views/Usercreate.vue'
import Login from '../views/Login.vue'
import SpotNewPage from '../views/SpotNewPage.vue'
import SpotIndexPage from '../views/SpotIndexPage.vue'
import SpotShowPage from '../views/SpotShowPage.vue'
import SpotEditPage from '../views/SpotEditPage.vue'
import CommentNewPage from '../views/CommentNewPage.vue'
import CommentShowPage from '../views/CommentShowPage.vue'
import CommentIndexPage from '../views/CommentIndexPage.vue'

const routes = [
  {
    //トップページに設定
    path: '/',
    name: 'Toppage',
    component: TopPage
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/usercreate', // ユーザー登録ページのルート
    name: 'Usercreate',
    component: Usercreate
  },
  {
    path: '/login', // ユーザー登録ページのルート
    name: 'Login',
    component: Login
  },
  {
    path: '/spots',
    name: 'spot_index',
    component: SpotIndexPage
  },
  {
    path: '/spots/new',
    name: 'spot_new',
    component: SpotNewPage
  },
  {
    path: '/spots/:id',
    name: 'spot_show',
    component: SpotShowPage
  },
  {
    path: '/spots/:id/edit',
    name: 'spot_edit',
    component: SpotEditPage
  },
  {
    path: '/spots/:id/comments/new/',
    name: 'comment_new',
    component: CommentNewPage
  },
  {
    path: '/spots/:id/comments/show/',
    name: 'comment_show',
    component: CommentShowPage
  },
  {
    path: '/spots/:id/comments/index/',
    name: 'comment_index',
    component: CommentIndexPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
