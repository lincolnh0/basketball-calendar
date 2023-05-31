import { createRouter, createWebHistory } from 'vue-router'
import TodayView from '../views/TodayView.vue'
import HistoricView from '../views/HistoricView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodayView
    },
    // {
    //   path: '/history',
    //   name: 'history',
    //   component: HistoricView,
    // }
  ]
})

export default router
