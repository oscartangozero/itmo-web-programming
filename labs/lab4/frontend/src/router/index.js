import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/MainView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  {path: '/', name: 'main', component: HomeView},
  {path: '/login', name: 'login', component: LoginView}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
