<!-- filepath: c:\Users\PUIB7325\OneDrive - orange.com\Documents\dev\trad\my-vue-app\src\views\Grammar.vue -->
<template>
  <div class="grammar">
    <div class="header">
      <h1>📝 Grammaire</h1>
      <p>Règles essentielles de l'italien</p>
    </div>

    <div class="grammar-rules">
      <div 
        v-for="rule in store.grammarRules"
        :key="rule.id"
        class="rule-card"
      >
        <h3>{{ rule.title }}</h3>
        <p class="explanation">{{ rule.explanation }}</p>
        
        <div class="examples">
          <h4>Exemples :</h4>
          <ul>
            <li v-for="example in rule.examples" :key="example">
              {{ example }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useLearningStore } from '../stores/learningStore'

export default {
  name: 'Grammar',
  setup() {
    const store = useLearningStore()
    return { store }
  }
}
</script>

<style scoped>
.grammar {
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

.grammar-rules {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rule-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.rule-card h3 {
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #667eea;
  padding-bottom: 5px;
}

.explanation {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.5;
}

.examples h4 {
  color: #333;
  margin-bottom: 10px;
  font-size: 16px;
}

.examples ul {
  list-style: none;
  padding: 0;
}

.examples li {
  background: #f8f9fa;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}
</style>