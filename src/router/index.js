import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '@/components/Header'
import QuestionBox from '@/components/QuestionBox'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Header',
    component: Header,
    children: [
      {
        path: '',
        name: 'QuestionBox',
        component: QuestionBox
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
