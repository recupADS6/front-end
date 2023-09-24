<template>
  <div>
    <header-menu></header-menu>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <div class="cadastro-vaga">
          <h1>Cadastro de Vagas</h1>
          <n-notification-provider>
            <job-form></job-form>
          </n-notification-provider>
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue';
import JobForm from '../components/JobForm.vue';
import { NNotificationProvider } from 'naive-ui';

export default {
  components: {
    HeaderMenu,
    JobForm,
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
