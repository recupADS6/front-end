<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <div id="app" :style="getPageStyle">
        <router-view/>
      </div>
    </n-message-provider>
  </n-loading-bar-provider>
</template>


<script>
export default {
  name: 'App',
  computed: {
    getPageStyle() {
      if (this.$route.name === 'cadastrar-usuario') {
        return {
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          color: '#2c3e50',
        };
      } else {
        return {
          fontFamily: 'Avenir, Helvetica, Arial, sans-serif',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          color: '#2c3e50',
          marginTop: '60px',
        };
      }
    }
}
};
</script>

<style>

body {
  margin: 0;
  padding: 0;
}
</style>