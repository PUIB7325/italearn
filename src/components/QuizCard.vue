
<template>
  <div class="quiz-card">
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="question-section">
      <h2>{{ currentQuestion.type === 'translate' ? 'Traduisez :' : 'Choisissez la bonne réponse :' }}</h2>
      <div class="question-text">{{ currentQuestion.question }}</div>
      
      <button v-if="currentQuestion.audio" @click="playAudio" class="audio-btn">
        🔊 Écouter
      </button>
    </div>

    <div class="answers-section">
      <button 
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        @click="selectAnswer(answer)"
        :class="['answer-btn', { 
          'correct': showResult && answer.correct,
          'incorrect': showResult && answer === selectedAnswer && !answer.correct,
          'selected': answer === selectedAnswer && !showResult
        }]"
        :disabled="showResult"
      >
        {{ answer.text }}
      </button>
    </div>

    <div v-if="showResult" class="result-section">
      <div :class="['result', { 'correct': isCorrect, 'incorrect': !isCorrect }]">
        {{ isCorrect ? '✅ Correct !' : '❌ Incorrect' }}
      </div>
      <div class="explanation" v-if="currentQuestion.explanation">
        {{ currentQuestion.explanation }}
      </div>
      <button @click="nextQuestion" class="next-btn">
        {{ currentIndex < questions.length - 1 ? 'Suivant' : 'Terminer' }}
      </button>
    </div>
  </div>
</template>

<script>
import { Howl } from 'howler'

export default {
  name: 'QuizCard',
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      selectedAnswer: null,
      showResult: false,
      score: 0
    }
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentIndex] || {}
    },
    progress() {
      return ((this.currentIndex + 1) / this.questions.length) * 100
    },
    isCorrect() {
      return this.selectedAnswer && this.selectedAnswer.correct
    }
  },
  methods: {
    selectAnswer(answer) {
      if (this.showResult) return
      this.selectedAnswer = answer
      this.showResult = true
      
      if (answer.correct) {
        this.score += 10
        this.$emit('correct-answer', this.currentQuestion)
      } else {
        this.$emit('wrong-answer', this.currentQuestion)
      }
    },

    nextQuestion() {
      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
        this.selectedAnswer = null
        this.showResult = false
      } else {
        this.$emit('quiz-completed', { 
          score: this.score, 
          total: this.questions.length * 10,
          correctAnswers: Math.floor(this.score / 10)
        })
      }
    },

    playAudio() {
      if (this.currentQuestion.audio) {
        const sound = new Howl({
          src: [this.currentQuestion.audio],
          onloaderror: () => {
            console.log('Erreur de chargement audio')
          }
        })
        sound.play()
      }
    }
  }
}
</script>

<style scoped>
.quiz-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 30px;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50, #45a049);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.question-section {
  text-align: center;
  margin-bottom: 30px;
}

.question-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin: 15px 0;
}

.audio-btn {
  background: #2196F3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.audio-btn:hover {
  background: #1976D2;
}

.answers-section {
  margin-bottom: 20px;
}

.answer-btn {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

.answer-btn:not(:disabled):hover {
  border-color: #2196F3;
  transform: translateY(-1px);
}

.answer-btn.selected {
  border-color: #2196F3;
  background: #e3f2fd;
}

.answer-btn.correct {
  border-color: #4CAF50;
  background: #e8f5e8;
}

.answer-btn.incorrect {
  border-color: #f44336;
  background: #ffebee;
}

.answer-btn:disabled {
  cursor: not-allowed;
}

.result-section {
  text-align: center;
  margin-top: 20px;
}

.result {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0;
}

.result.correct {
  color: #4CAF50;
}

.result.incorrect {
  color: #f44336;
}

.explanation {
  background: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  margin: 15px 0;
  font-style: italic;
  color: #666;
}

.next-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: background 0.3s ease;
}

.next-btn:hover {
  background: #45a049;
}
</style>