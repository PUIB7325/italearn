
<template>
  <nav class="bottom-nav">
    <router-link to="/" class="nav-item" :class="{ active: $route.name === 'Home' }">
      <div class="nav-icon">🏠</div>
      <span>Accueil</span>
    </router-link>
    
    <router-link to="/vocabulary" class="nav-item" :class="{ active: $route.name === 'Vocabulary' }">
      <div class="nav-icon">📚</div>
      <span>Vocabulaire</span>
    </router-link>
    
    <router-link to="/grammar" class="nav-item" :class="{ active: $route.name === 'Grammar' }">
      <div class="nav-icon">📝</div>
      <span>Grammaire</span>
    </router-link>
    
    <router-link to="/pronunciation" class="nav-item" :class="{ active: $route.name === 'Pronunciation' }">
      <div class="nav-icon">🎤</div>
      <span>Audio</span>
    </router-link>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 400px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 12px;
  transition: color 0.3s ease;
}

.nav-item.active {
  color: #667eea;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 5px;
}
</style>