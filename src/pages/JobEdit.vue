<template>
    <div>
      <header-menu></header-menu>
      <n-layout>
        <n-layout-content content-style="padding: 24px;">
          <div class="editar-vaga">
            <h1>Editar Vaga</h1>
            <n-notification-provider>
              <job-edit-form></job-edit-form>
            </n-notification-provider>
          </div>
        </n-layout-content>
      </n-layout>
    </div>
  </template>
  
  <script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import JobEditForm from '../components/JobEditForm.vue';
  import { NNotificationProvider } from 'naive-ui';
  
  export default {
    components: {
      HeaderMenu,
      JobEditForm,
      NNotificationProvider,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  .n-layout-content {
    background-color: #efefef ;
    height: 90vh;
  }
  
  </style>