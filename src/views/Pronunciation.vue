<!-- filepath: c:\Users\PUIB7325\OneDrive - orange.com\Documents\dev\trad\my-vue-app\src\views\Pronunciation.vue -->
<template>
  <div class="pronunciation">
    <div class="header">
      <h1>🎤 Prononciation</h1>
      <p>Entraînez-vous à prononcer correctement</p>
    </div>

    <div class="pronunciation-cards">
      <div 
        v-for="word in store.vocabulary"
        :key="word.id"
        class="pronunciation-card"
      >
        <div class="word-info">
          <div class="italian">{{ word.italian }}</div>
          <div class="french">{{ word.french }}</div>
        </div>
        
        <div class="audio-controls">
          <button @click="playAudio(word)" class="play-btn">
            🔊 Écouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'
import { Howl } from 'howler'

export default {
  name: 'Pronunciation',
  setup() {
    const store = useLearningStore()
    return { store }
  },
  methods: {
    playAudio(word) {
      if (word.audio) {
        const sound = new Howl({
          src: [word.audio],
          onloaderror: () => {
            console.log('Audio non disponible')
          }
        })
        sound.play()
      }
    }
  }
}
</script>

<style scoped>
.pronunciation {
  padding: 20px;
  padding-bottom: 80px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.pronunciation-cards {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pronunciation-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.italian {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.french {
  font-size: 14px;
  color: #666;
  margin-top: 5px;
}

.play-btn {
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 20px;
  cursor: pointer;
}
</style>