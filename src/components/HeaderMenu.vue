<template>
    <n-layout>
        <n-layout-header> HEADER
            <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions"/>
        </n-layout-header>
    </n-layout>
</template>
  
<script>
  import { defineComponent, h, ref } from "vue";
  import { NIcon } from "naive-ui";
  import {
    PersonOutline as PersonIcon,
  } from "@vicons/ionicons5";

  import {
    UserRegular as UserIcon
  } from "@vicons/fa";
  
  function renderIcon(icon) {
    return () => h(NIcon, null, { default: () => h(icon) });
  }
  
  const menuOptions = [
    {
      label: "USER",
      key: "Dance Dance Dance",
      icon: renderIcon(UserIcon),
      children: [
        {
          type: "group",
          label: "People",
          key: "people",
          children: [
            {
              label: "Minha Conta",
              key: "account",
              icon: renderIcon(PersonIcon)
            },
            {
              label: "Privacidade e Segurança",
              key: "security",
              icon: renderIcon(PersonIcon)
            }
          ]
        },
        {
          label: "Notificações",
          key: "notification",
          icon: renderIcon(PersonIcon),
        },
        {
          label: "Sair",
          key: "logout",
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
  color: white;
  position: fixed;
  top: 0;
  height: 60px;
}
</style>