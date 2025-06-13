<!-- filepath: c:\Users\PUIB7325\OneDrive - orange.com\Documents\dev\trad\my-vue-app\src\views\Vocabulary.vue -->
<template>
  <div class="vocabulary">
    <div class="header">
      <h1>📚 Vocabulaire</h1>
      <p>{{ store.vocabulary.length }} mots au total</p>
    </div>

    <div class="categories">
      <button 
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="['category-btn', { active: selectedCategory === category }]"
      >
        {{ category }}
      </button>
    </div>

    <div class="word-list">
      <div 
        v-for="word in filteredWords"
        :key="word.id"
        class="word-card"
        @click="playWordAudio(word)"
      >
        <div class="word-content">
          <div class="italian">{{ word.italian }}</div>
          <div class="french">{{ word.french }}</div>
          <div class="category-tag">{{ word.category }}</div>
        </div>
        <button class="audio-btn" @click.stop="playWordAudio(word)">
          🔊
        </button>
      </div>
    </div>

    <div class="actions">
      <button @click="startVocabularyQuiz" class="quiz-btn">
        🎯 Quiz vocabulaire
      </button>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'
import { Howl } from 'howler'

export default {
  name: 'Vocabulary',
  setup() {
    const store = useLearningStore()
    return { store }
  },
  data() {
    return {
      selectedCategory: 'tous'
    }
  },
  computed: {
    categories() {
      const cats = [...new Set(this.store.vocabulary.map(w => w.category))]
      return ['tous', ...cats]
    },
    filteredWords() {
      if (this.selectedCategory === 'tous') {
        return this.store.vocabulary
      }
      return this.store.vocabulary.filter(w => w.category === this.selectedCategory)
    }
  },
  methods: {
    playWordAudio(word) {
      if (word.audio) {
        const sound = new Howl({
          src: [word.audio],
          onloaderror: () => {
            console.log('Audio non disponible pour:', word.italian)
          }
        })
        sound.play()
      }
    },

    startVocabularyQuiz() {
      this.$router.push('/quiz/vocabulary')
    }
  }
}
</script>

<style scoped>
.vocabulary {
  padding: 20px;
  padding-bottom: 80px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin-bottom: 5px;
}

.header p {
  color: #666;
  font-size: 14px;
}

.categories {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
  padding: 10px 0;
}

.category-btn {
  background: white;
  border: 2px solid #e0e0e0;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;
  text-transform: capitalize;
}

.category-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.word-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.word-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.word-card:hover {
  transform: translateY(-2px);
}

.word-content {
  flex: 1;
}

.italian {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.french {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.category-tag {
  font-size: 12px;
  background: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  display: inline-block;
  text-transform: capitalize;
}

.audio-btn {
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;
}

.audio-btn:hover {
  background: #1976D2;
}

.actions {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 360px;
}

.quiz-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
</style>