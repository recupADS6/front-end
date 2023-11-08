

<template>
    <div>
      <n-layout >
        <n-layout-content >
            <n-notification-provider>
                <user-form></user-form>
            </n-notification-provider>
        </n-layout-content>
      </n-layout>
    </div>
  </template>
  
  <script>
 
  import UserForm from '../components/UserForm.vue';
  import { NNotificationProvider } from 'naive-ui';
  
  export default {
    components: {

      NNotificationProvider,
      UserForm
    },
  };
 
 </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  n-layout-content {
    background-color: #efefef ;
    height: 100vh;
  }
  
  </style>


