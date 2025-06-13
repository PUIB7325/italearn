<!-- filepath: c:\Users\PUIB7325\OneDrive - orange.com\Documents\dev\trad\my-vue-app\src\views\Dialogues.vue -->
<template>
  <div class="dialogues">
    <div class="header">
      <h1>💬 Dialogues</h1>
      <p>Conversations pratiques</p>
    </div>

    <div class="dialogue-list">
      <div 
        v-for="dialogue in store.dialogues"
        :key="dialogue.id"
        class="dialogue-card"
      >
        <h3>{{ dialogue.title }}</h3>
        
        <div class="dialogue-lines">
          <div 
            v-for="(line, index) in dialogue.lines"
            :key="index"
            class="dialogue-line"
          >
            <div class="speaker">{{ line.speaker }}</div>
            <div class="italian">{{ line.italian }}</div>
            <div class="french">{{ line.french }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'

export default {
  name: 'Dialogues',
  setup() {
    const store = useLearningStore()
    return { store }
  }
}
</script>

<style scoped>
.dialogues {
  padding: 20px;
  padding-bottom: 80px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.dialogue-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dialogue-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.dialogue-card h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.dialogue-lines {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.dialogue-line {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
}

.speaker {
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.italian {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}

.french {
  font-size: 14px;
  color: #666;
  font-style: italic;
}
</style>