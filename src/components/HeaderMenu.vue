<template>
  <n-layout >
      <n-layout-header class="nav-bar">
        <p class="welcome">Olá, Fulano</p>
        <n-menu
          id="menu-item"
          v-model:value="activeKey"
          mode="horizontal"
          :options="menuOptions"
        />
      </n-layout-header>
  </n-layout>

</template>

<script>
  import { defineComponent, ref } from "vue";

  const menuOptions = [
    {
      label: "Home",
      key: "home",
    },
    {
      label: "Cadastro de Vagas",
      key: "job",
    },
    {
      label: "Minha Conta",
      key: "account",
    },
    {
      label: "Privacidade e Segurança",
      key: "security",
    },
    {
      label: "Notificações",
      key: "notification",
    },
    {
      label: "Sair",
      key: "logout",
    },
  ];

  export default defineComponent({
    setup() {
      return {
        activeKey: ref(null),
        menuOptions
      };
    }
  });
</script>

<style>
  .n-layout-header {
    background-color: #000000;
    position: fixed;
    top: 0;
    height: 70px;
    padding: 10px;
  }

  #menu-item .n-menu-item-content-header {
    color: #ffffff !important;
  }

  #menu-item .n-menu-item-content-header:hover {
    color: #62A362 !important;
  }

  .welcome {
    color: #ffffff;
    font-size: 20px;
    padding: 10px;
  }

  .nav-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0 20px;
  }
</style>