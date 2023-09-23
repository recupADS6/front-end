import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import CadastroVaga from '../pages/CadastroVaga.vue'

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
