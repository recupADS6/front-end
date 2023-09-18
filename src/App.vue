<template>
  <div id="app">
    <!-- <cadastro-vaga></cadastro-vaga> -->
    <!-- <dash-board></dash-board> -->
    <side-bar-filters></side-bar-filters>

  </div>
</template>


<script>
// import CadastroVaga from './components/CadastroVaga.vue';
// import DashBoard from './components/DashBoard.vue';
import SideBarFilters from './components/SideBarFilters.vue';

export default {
  components: {
    // CadastroVaga,
    // DashBoard,
    SideBarFilters
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
