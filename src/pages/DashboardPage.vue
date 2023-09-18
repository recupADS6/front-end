<template>
  <div>
    <header-menu/>
    <side-bar-filters></side-bar-filters>
  </div>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import SideBarFilters from '../components/SideBarFilters.vue';
  import { defineComponent} from "vue";


  export default defineComponent({
    components: {
      SideBarFilters,
      HeaderMenu,
    },

    setup() {
      return {
        // data
      }
    }
  })
</script>