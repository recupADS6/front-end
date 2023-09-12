<template>
  <div id="app">
    <job-form></job-form>
  </div>
</template>

<script>
import JobForm from './components/JobForm.vue';

export default {
  components: {
    JobForm
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 80px;
}
body {
  margin: 0;
  padding: 0;
}
</style>
