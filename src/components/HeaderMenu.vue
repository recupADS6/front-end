<template>
	<n-layout>
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
import { defineComponent, ref, h } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
  setup() {
    const activeKey = ref(null);

    const menuOptions = [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "dashboard-page",
              },
            },
            { default: () => "Home" }
          ),
        key: "home",
        route: "/",
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: "chatgpt",
              },
            },
            { default: () => "Cadastro de Vagas" }
          ),
        key: "cha",
        route: "/vaga-chatgpt",
      },
      {
        label: "Sair",
        key: "logout",
        onClick: handleLogout,
      },
    ];

    function handleLogout() {
					console.log("Logout realizado");
     this.$router.push("/login");
    }

    return {
      activeKey,
      menuOptions,
    };
  },
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

  #menu-item .n-menu-item-content-header a {
    color: #ffffff !important;
  }

  #menu-item .n-menu-item-content-header a:hover {
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