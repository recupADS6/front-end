import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import CadastroVaga from '../pages/CadastroVaga.vue'
import VagaChatgpt from '../pages/VagaChatgpt.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard-page',
    component: DashboardPage
  },
  {
    path: '/cadastrar-vaga',
    name: 'cadastrar-vaga',
    component: CadastroVaga
  },
  {
    path: '/vaga-chatgpt',
    name: 'chatgpt',
    component: VagaChatgpt
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router