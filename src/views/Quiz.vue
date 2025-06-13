<!-- filepath: c:\Users\PUIB7325\OneDrive - orange.com\Documents\dev\trad\my-vue-app\src\views\Quiz.vue -->
<template>
  <div class="quiz-view">
    <div v-if="!quizStarted" class="quiz-intro">
      <h1>{{ quizTitle }}</h1>
      <p>{{ quizDescription }}</p>
      <button @click="startQuiz" class="start-btn">Commencer le quiz</button>
    </div>

    <QuizCard 
      v-else-if="questions.length > 0"
      :questions="questions"
      @correct-answer="handleCorrectAnswer"
      @wrong-answer="handleWrongAnswer"
      @quiz-completed="handleQuizCompleted"
    />

    <div v-else-if="quizStarted" class="no-questions">
      <h2>Aucune question disponible</h2>
      <p>Revenez plus tard pour plus de contenu !</p>
      <button @click="$router.push('/')" class="home-btn">Retour à l'accueil</button>
    </div>

    <!-- Résultats du quiz -->
    <div v-if="showResults" class="quiz-results">
      <h2>🎉 Quiz terminé !</h2>
      <div class="score">
        <div class="score-circle">
          <span class="score-text">{{ results.correctAnswers }}/{{ questions.length }}</span>
        </div>
        <p>{{ results.score }} points gagnés</p>
      </div>
      
      <div class="actions">
        <button @click="restartQuiz" class="restart-btn">Recommencer</button>
        <button @click="$router.push('/')" class="home-btn">Accueil</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'
import QuizCard from '../components/QuizCard.vue'

export default {
  name: 'Quiz',
  components: {
    QuizCard
  },
  setup() {
    const store = useLearningStore()
    return { store }
  },
  data() {
    return {
      quizStarted: false,
      questions: [],
      showResults: false,
      results: null
    }
  },
  computed: {
    quizType() {
      return this.$route.params.type || 'daily'
    },
    quizTitle() {
      const titles = {
        daily: '🎯 Défi quotidien',
        vocabulary: '📚 Quiz vocabulaire',
        grammar: '📝 Quiz grammaire'
      }
      return titles[this.quizType] || 'Quiz'
    },
    quizDescription() {
      const descriptions = {
        daily: 'Testez vos connaissances avec 5 questions aléatoires',
        vocabulary: 'Révisez votre vocabulaire italien',
        grammar: 'Testez vos connaissances grammaticales'
      }
      return descriptions[this.quizType] || 'Quiz interactif'
    }
  },
  methods: {
    startQuiz() {
      this.questions = this.store.generateQuizQuestions(this.quizType, 5)
      this.quizStarted = true
    },

    handleCorrectAnswer(question) {
      this.store.markWordReviewed(question.id, true)
      this.store.addPoints(10)
    },

    handleWrongAnswer(question) {
      this.store.markWordReviewed(question.id, false)
    },

    handleQuizCompleted(results) {
      this.results = results
      this.showResults = true
      this.store.completeLesson(`quiz_${this.quizType}_${Date.now()}`)
    },

    restartQuiz() {
      this.quizStarted = false
      this.showResults = false
      this.results = null
    }
  }
}
</script>

<style scoped>
.quiz-view {
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quiz-intro {
  text-align: center;
  padding: 40px 20px;
}

.quiz-intro h1 {
  color: #333;
  margin-bottom: 15px;
}

.quiz-intro p {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
}

.start-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.start-btn:hover {
  transform: scale(1.05);
}

.no-questions {
  text-align: center;
  padding: 40px 20px;
}

.quiz-results {
  text-align: center;
  padding: 40px 20px;
  background: white;
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.score {
  margin: 30px 0;
}

.score-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
}

.score-text {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
}

.restart-btn {
  background: #2196F3;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
}

.home-btn {
  background: #666;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
}
</style>