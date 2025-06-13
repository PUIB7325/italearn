import { defineStore } from 'pinia'

export const useLearningStore = defineStore('learning', {
  state: () => ({
    currentLevel: 1,
    totalPoints: 0,
    dailyStreak: 0,
    completedLessons: [],
    vocabulary: [
      {
        id: 1,
        italian: 'Ciao',
        french: 'Salut',
        audio: '/audio/ciao.mp3',
        image: '/images/greeting.jpg',
        category: 'salutations',
        lastReviewed: null,
        reviewCount: 0
      },
      {
        id: 2,
        italian: 'Grazie',
        french: 'Merci',
        audio: '/audio/grazie.mp3',
        image: '/images/thanks.jpg',
        category: 'politesse',
        lastReviewed: null,
        reviewCount: 0
      },
      {
        id: 3,
        italian: 'Per favore',
        french: 'S\'il vous plaît',
        audio: '/audio/perfavore.mp3',
        image: '/images/please.jpg',
        category: 'politesse',
        lastReviewed: null,
        reviewCount: 0
      },
      {
        id: 4,
        italian: 'Scusi',
        french: 'Excusez-moi',
        audio: '/audio/scusi.mp3',
        image: '/images/excuse.jpg',
        category: 'politesse',
        lastReviewed: null,
        reviewCount: 0
      },
      {
        id: 5,
        italian: 'Buongiorno',
        french: 'Bonjour',
        audio: '/audio/buongiorno.mp3',
        image: '/images/morning.jpg',
        category: 'salutations',
        lastReviewed: null,
        reviewCount: 0
      }
    ],
    grammarRules: [
      {
        id: 1,
        title: 'Articles définis',
        explanation: 'Il (masculin singulier), La (féminin singulier), I (masculin pluriel), Le (féminin pluriel)',
        examples: ['Il libro (le livre)', 'La casa (la maison)', 'I libri (les livres)', 'Le case (les maisons)'],
        exercises: [
          {
            question: 'Quel article pour "libro" (livre) ?',
            answers: [
              { text: 'Il', correct: true },
              { text: 'La', correct: false },
              { text: 'I', correct: false }
            ]
          }
        ]
      },
      {
        id: 2,
        title: 'Verbe être (Essere)',
        explanation: 'Conjugaison du verbe être au présent',
        examples: ['Io sono (je suis)', 'Tu sei (tu es)', 'Lui/Lei è (il/elle est)'],
        exercises: []
      }
    ],
    dialogues: [
      {
        id: 1,
        title: 'Au restaurant',
        lines: [
          { speaker: 'Serveur', italian: 'Buongiorno! Come va?', french: 'Bonjour! Comment allez-vous?' },
          { speaker: 'Client', italian: 'Bene, grazie. Un tavolo per due, per favore.', french: 'Bien, merci. Une table pour deux, s\'il vous plaît.' },
          { speaker: 'Serveur', italian: 'Certamente! Seguitemi.', french: 'Certainement! Suivez-moi.' }
        ]
      }
    ]
  }),

  getters: {
    wordsToReview: (state) => {
      const now = new Date()
      return state.vocabulary.filter(word => {
        if (!word.lastReviewed) return true
        const daysSinceReview = (now - new Date(word.lastReviewed)) / (1000 * 60 * 60 * 24)
        const interval = Math.pow(2, word.reviewCount)
        return daysSinceReview >= interval
      })
    },

    progressPercentage: (state) => {
      return Math.min((state.completedLessons.length / 50) * 100, 100)
    },

    vocabularyByCategory: (state) => {
      return state.vocabulary.reduce((acc, word) => {
        if (!acc[word.category]) {
          acc[word.category] = []
        }
        acc[word.category].push(word)
        return acc
      }, {})
    }
  },

  actions: {
    addPoints(points) {
      this.totalPoints += points
    },

    markWordReviewed(wordId, correct) {
      const word = this.vocabulary.find(w => w.id === wordId)
      if (word) {
        word.lastReviewed = new Date().toISOString()
        if (correct) {
          word.reviewCount += 1
        } else {
          word.reviewCount = Math.max(0, word.reviewCount - 1)
        }
      }
    },

    completeLesson(lessonId) {
      if (!this.completedLessons.includes(lessonId)) {
        this.completedLessons.push(lessonId)
        this.addPoints(10)
      }
    },

    generateQuizQuestions(type = 'daily', count = 5) {
      const questions = []
      let sourceData = []

      if (type === 'vocabulary') {
        sourceData = this.wordsToReview.slice(0, count)
        sourceData.forEach(word => {
          questions.push({
            id: word.id,
            type: 'translate',
            question: word.italian,
            audio: word.audio,
            answers: [
              { text: word.french, correct: true },
              { text: this.getRandomTranslation(word.id), correct: false },
              { text: this.getRandomTranslation(word.id), correct: false }
            ].sort(() => Math.random() - 0.5),
            explanation: `"${word.italian}" signifie "${word.french}"`
          })
        })
      }

      return questions
    },

    getRandomTranslation(excludeId) {
      const otherWords = this.vocabulary.filter(w => w.id !== excludeId)
      return otherWords[Math.floor(Math.random() * otherWords.length)].french
    }
  }
})