<template>
    <n-layout >
        <n-layout-header class="nav-bar">
          <p class="welcome">Olá, Fulano</p>
          <n-space justify="end">
            <n-menu class="nav-menu" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
          </n-space>
        </n-layout-header>
    </n-layout>
    </template>
  
<script>
  import { defineComponent, ref, h } from "vue";
  import { RouterLink } from "vue-router";

  const menuOptions = [
    {
      label: () => h(
        RouterLink,
        {
          to: {
            name: "dashboard-page",
          }
        },
        { default: () => "Home" }
      ),
      key: "home",
      route: "/"
    },
    {
      label: () => h(
        RouterLink,
        {
          to: {
            name: "cadastrar-vaga",
          }
        },
        { default: () => "Cadastro de Vagas" }
      ),
      key: "job",
      route: "/cadastro-de-vaga"
    },
    {
      label: () => h(
        RouterLink,
        {
          to: {
            name: "vaga-chatgpt",
          }
        },
        { default: () => "Gerar CHA" }
      ),
      key: "cha",
      route: "/vaga-chatgpt"
    },
    // {
    //   label: "Minha Conta",
    //   key: "account",
    // },
    // {
    //   label: "Privacidade e Segurança",
    //   key: "security",
    // },
    // {
    //   label: "Notificações",
    //   key: "notification",
    // },
    // {
    //   label: "Sair",
    //   key: "logout",
    // },
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

<style scoped>
.n-layout-header {
  background-color: #000000;
  position: fixed;
  top: 0;
  height: 70px;
  padding: 10px;
}
.nav-menu {
  background-color: #ffffff78;
  color: #ffffff;
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
