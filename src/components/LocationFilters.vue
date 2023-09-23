<template>
  <div>
    <n-space vertical>
    <n-h2>Localização</n-h2>
    <div class="location-section">
      <n-select class="location-select" v-model:value="value" :options="locationOptions" />

      <n-button class="search-button" type="search">
        Search
      </n-button>
    </div>
  </n-space>
  </div>
</template>

<script>
import {
  NButton,
  NH2,
  NSelect,
} from 'naive-ui';
import { defineComponent, ref } from 'vue';
  import locationOptions from "../utils/locationOptions.js"

export default defineComponent({
  components: {
    NButton,
    NH2,
    NSelect,
  },

  setup(){
    return {
      value: ref("Escolha um estado"),
      locationOptions,
    }
  }
})
</script>

<style>
  .location-select {
    width: 80%;
    margin-left: 5px;
  }

  .search-button {
    margin-right: 5px;
    margin-left: 3px;
    width: 20%;
    background-color: #62A362;
  }

  .location-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>