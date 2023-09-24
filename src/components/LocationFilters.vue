<template>
  <div>
    <n-space vertical>
    <n-h2>Localização</n-h2>
    <div>
      <n-select class="location-select" v-model:value="locationItem" :options="locationOptions" />
    </div>
  </n-space>
  </div>
</template>

<script>
import {
  NH2,
  NSelect,
} from 'naive-ui';
import { defineComponent, ref, watch } from 'vue';
import locationOptions from "../utils/locationOptions.js"

export default defineComponent({
  components: {
    NH2,
    NSelect,
  },

  emits: ['location-selected'],

  setup(_, { emit }){
    const locationItem = ref("Selecione uma localização");

    watch(locationItem, (newValue) => {
      emit('location-selected', newValue);
    });

    return {
      locationOptions,
      locationItem
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