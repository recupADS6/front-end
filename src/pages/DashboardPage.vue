<template>
  <n-space vertical>
    <header-menu/>

    <div class="add-vaga-button">
      <n-button type="primary" class="add-job-button">
        Adicionar Vaga
      </n-button>
    </div>

    <location-filters class="wrap"/>
    <side-bar-filters/>
  </n-space>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import SideBarFilters from '../components/SideBarFilters.vue';
  import LocationFilters from '../components/LocationFilters.vue';
  import { defineComponent} from "vue";
  import { NButton, NSpace } from 'naive-ui';


  export default defineComponent({
    components: {
      SideBarFilters,
      HeaderMenu,
      LocationFilters,
      NButton,
      NSpace
    },

    setup() {
      return {
        // data
      }
    }
  })
</script>

<style>
  .add-job-button {
    margin-right: 5px;
    margin-left: 3px;
    width: 8.5rem;
    height: 2.5rem;
    background-color: #62A362;
  }

  .add-vaga-button {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
    margin-right: 1rem;
  }

  .wrap {
    padding: 0 1.5rem 0 1.5rem;
  }
</style>