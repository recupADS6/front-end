<template>
  <div id="app">
    <cadastro-vaga></cadastro-vaga>
  </div>
</template>


<script>
import CadastroVaga from './pages/CadastroVaga.vue';

export default {
  components: {
    CadastroVaga
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
