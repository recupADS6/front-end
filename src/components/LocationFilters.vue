<template>
  <div>
    <n-space vertical>
    <n-h2>Localização</n-h2>
    <div>
      <n-select class="location-select" v-model:value="value" :options="locationOptions" />
    </div>
  </n-space>
  </div>
</template>

<script>
import {
  NH2,
  NSelect,
} from 'naive-ui';
import { defineComponent, ref } from 'vue';
  import locationOptions from "../utils/locationOptions.js"

export default defineComponent({
  components: {
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
    width: 95%;
    margin-left: 5px;
  }
</style>