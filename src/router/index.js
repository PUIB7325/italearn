
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Vocabulary from '../views/Vocabulary.vue'
import Grammar from '../views/Grammar.vue'
import Quiz from '../views/Quiz.vue'
import Pronunciation from '../views/Pronunciation.vue'
import Dialogues from '../views/Dialogues.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: Vocabulary
  },
  {
    path: '/grammar',
    name: 'Grammar',
    component: Grammar
  },
  {
    path: '/quiz/:type?',
    name: 'Quiz',
    component: Quiz
  },
  {
    path: '/pronunciation',
    name: 'Pronunciation',
    component: Pronunciation
  },
  {
    path: '/dialogues',
    name: 'Dialogues',
    component: Dialogues
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router