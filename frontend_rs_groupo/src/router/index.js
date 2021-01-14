import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeSignup from '../views/HomeSignup.vue'
import HomeLogin from '../views/HomeLogin.vue'
import UserPostView from '../views/UserPostView.vue'
import UserCreate from '../views/UserCreate.vue'
import UserProfil from '../views/UserProfil.vue'
import UserMyProfil from '../views/UserMyProfil.vue'
import UserUpdateProfil from '../views/UserUpdateProfil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: HomeSignup
  },
  {
    path: '/login',
    name: 'Login',
    component: HomeLogin
  },
  {
    path: '/allpost',
    name: 'AllPost',
    component: UserPostView
  },
  {
      path: '/create',
      name: 'Create',
      component: UserCreate
    
  },
  {
    path: '/profil',
    name: 'Profil',
    component: UserProfil
  },
  {
    path: '/myprofil',
    name: 'MyProfil',
    component: UserMyProfil
  },
  
  {
    path: '/updateuserform',
    name: 'UserUpdateForm',
    component: UserUpdateProfil
  }

  
]

const router = new VueRouter({
  routes
})

export default router
