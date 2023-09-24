<template>
<n-loading-bar-provider>
  <n-message-provider>
  <div id="app">
    <dashboard-page></dashboard-page>

  </div>
  </n-message-provider>
  </n-loading-bar-provider>
</template>


<script>
import CadastroVaga from './pages/CadastroVaga.vue';
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
