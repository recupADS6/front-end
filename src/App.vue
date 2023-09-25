<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <div id="app">
        <router-view/>
      </div>
    </n-message-provider>
  </n-loading-bar-provider>
</template>


<script>
export default {
  name: 'App',
}
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