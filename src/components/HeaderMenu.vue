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
  import { defineComponent, h, ref } from "vue";
  import { NIcon } from "naive-ui";
  import {
    LogOutOutline as LogoutIcon,
    NotificationsOutline as NotificationIcon,
    Menu as MenuIcon} from "@vicons/ionicons5";
  import {UserRegular as UserIcon} from "@vicons/fa";
  import {SecurityFilled as SecurityIcon} from "@vicons/material";
  
  function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }
  
  const menuOptions = [
    {
      label: "Menu",
      key: "menu",
      icon: renderIcon(MenuIcon),
      children: [
            {
              label: "Minha Conta",
              key: "account",
              icon: renderIcon(UserIcon)
            },
            {
              label: "Privacidade e Segurança",
              key: "security",
              icon: renderIcon(SecurityIcon)
            },
            {
              label: "Notificações",
              key: "notification",
              icon: renderIcon(NotificationIcon),
            },
            {
              label: "Sair",
              key: "logout",
              icon: renderIcon(LogoutIcon),
            },
        ]
    }
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
