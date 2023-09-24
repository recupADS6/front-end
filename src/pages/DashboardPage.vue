<template>
  <n-space vertical>
    <header-menu/>
    <side-bar-filters/>
  </n-space>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import SideBarFilters from '../components/SideBarFilters.vue';
  import { defineComponent} from "vue";
  import { NSpace } from 'naive-ui';


  export default defineComponent({
    components: {
      SideBarFilters,
      HeaderMenu,
      NSpace
    },

    setup() {
      return {
        // data
      }
    }
  })
</script>
