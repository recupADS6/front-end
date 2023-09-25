<template>
  <div>
    <header-menu></header-menu>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <div class="cadastro-vaga">
          <h1>Cadastro de Vagas</h1>
            <chat-form></chat-form>
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue';
import ChatForm from '../components/ChatForm.vue';

export default {
  components: {
    HeaderMenu,
    ChatForm
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
