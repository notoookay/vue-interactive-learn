import { createRouter, createWebHashHistory } from 'vue-router'
import { lessons } from '../lessons/index.js'
import LessonPage from '../components/LessonPage.vue'
import HomePage from '../components/HomePage.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/lesson/:id', component: LessonPage },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
