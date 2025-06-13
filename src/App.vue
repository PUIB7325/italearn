<template>
  <div id="app">
    <NavBar />
    <router-view />
    <BottomNav />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import BottomNav from './components/BottomNav.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    BottomNav
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}
</style>