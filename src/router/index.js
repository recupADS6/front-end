import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue'
import CadastroVaga from '../pages/CadastroVaga.vue'
import VagaChatgpt from '../pages/VagaChatgpt.vue'
import JobDetails from '../pages/JobDetails.vue'
import JobEdit from '../pages/JobEdit.vue'
import UserRegistration from '../pages/UserRegistration.vue'

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
  },
  {
    path: '/:id',
    name: 'job-details',
    component: JobDetails,
  },
  {
    path: '/editar/:id',
    name: 'job-edit',
    component: JobEdit,
  },
  {
    path: '/cadastrar-usuario',
    name: 'cadastrar-usuario',
    component: UserRegistration
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
