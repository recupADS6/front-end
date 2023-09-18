<template>
  <div id="app">
    <dashboard-page></dashboard-page>

  </div>
</template>


<script>
import DashboardPage from './pages/DashboardPage.vue';

export default {
  components: {
    DashboardPage
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  margin: 0;
  padding: 0;
}
</style>
