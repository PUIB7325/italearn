
<template>
  <div class="home">
    <div class="daily-challenge">
      <h2>🎯 Défi du jour</h2>
      <p>Apprenez 5 nouveaux mots en 5 minutes</p>
      <button @click="startDailyChallenge" class="challenge-btn">
        Commencer ({{ wordsToReview }} mots)
      </button>
    </div>

    <div class="quick-actions">
      <div class="action-card" @click="$router.push('/vocabulary')">
        <div class="icon">📚</div>
        <h3>Vocabulaire</h3>
        <p>{{ wordsToReview }} mots à réviser</p>
      </div>

      <div class="action-card" @click="$router.push('/grammar')">
        <div class="icon">📝</div>
        <h3>Grammaire</h3>
        <p>{{ store.grammarRules.length }} règles</p>
      </div>

      <div class="action-card" @click="$router.push('/pronunciation')">
        <div class="icon">🎤</div>
        <h3>Prononciation</h3>
        <p>Entraînez-vous</p>
      </div>

      <div class="action-card" @click="$router.push('/dialogues')">
        <div class="icon">💬</div>
        <h3>Dialogues</h3>
        <p>{{ store.dialogues.length }} conversations</p>
      </div>
    </div>

    <div class="progress-section">
      <h3>Votre progression</h3>
      <div class="progress-bar">
        <div class="progress" :style="{ width: `${store.progressPercentage}%` }"></div>
      </div>
      <p>{{ store.completedLessons.length }} leçons terminées</p>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'

export default {
  name: 'Home',
  setup() {
    const store = useLearningStore()
    return { store }
  },
  computed: {
    wordsToReview() {
      return this.store.wordsToReview.length
    }
  },
  methods: {
    startDailyChallenge() {
      this.$router.push('/quiz/daily')
    }
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
  padding-bottom: 80px;
}

.daily-challenge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 30px;
}

.daily-challenge h2 {
  margin-bottom: 10px;
}

.challenge-btn {
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 15px;
  transition: transform 0.2s ease;
}

.challenge-btn:hover {
  transform: scale(1.05);
}

.quick-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.action-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.action-card:hover {
  transform: translateY(-2px);
}

.action-card .icon {
  font-size: 32px;
  margin-bottom: 10px;
}

.action-card h3 {
  margin: 10px 0 5px 0;
  color: #333;
}

.action-card p {
  font-size: 12px;
  color: #666;
  margin: 0;
}

.progress-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.progress-section h3 {
  margin-bottom: 15px;
  color: #333;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 5px;
  transition: width 0.3s ease;
}

.progress-section p {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>