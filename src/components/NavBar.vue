
<template>
  <nav class="navbar">
    <div class="nav-content">
      <h1 class="logo">🇮🇹 Italiano</h1>
      <div class="user-stats">
        <div class="streak">🔥 {{ store.dailyStreak }}</div>
        <div class="points">⭐ {{ store.totalPoints }}</div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'

export default {
  name: 'NavBar',
  setup() {
    const store = useLearningStore()
    return { store }
  }
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  margin: 0;
}

.user-stats {
  display: flex;
  gap: 15px;
  font-size: 14px;
}

.streak, .points {
  background: rgba(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}
</style>