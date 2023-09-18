<template>
  <div>
    <h1>Filtros</h1>

    <n-space vertical>
      <n-switch v-model:value="collapsed" />

      <n-space vertical>
        <n-select v-model:value="value" :options="options" />
        <n-input v-model:value="value" type="text" placeholder="Basic Input" />
      </n-space>

      <n-layout has-sider>
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :render-label="renderMenuLabel"
            :render-icon="renderMenuIcon"
            :expand-icon="expandIcon"
          />
        </n-layout-sider>
        <n-layout>
          <list-jobs />
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script>
  import { h, ref, defineComponent } from 'vue'
  // NSpace, NLayout, NLayoutSider, NMenu, NSwitch
  import { NIcon } from 'naive-ui'
  import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
  import ListJobs from './ListJobs.vue'

  const menuOptions = [
    {
      label: "Localização",
      key: "jobLocation",
      // href: "https://en.wikipedia.org/wiki/Hear_the_Wind_Sing"
    },
    {
      label: "Tipo Vaga de Emprego",
      key: "Tipo Vaga de Emprego",
      children: [
        {
          type: "group",
          key: "jobType",
          children: [
            {
              label: "Jovem Aprendiz",
              key: "narrator"
            },
            {
              label: "Estágio",
              key: "narrator"
            },
            {
              label: "Período Integral",
              key: "narrator"
            },
            {
              label: "Contrato",
              key: "narrator"
            },
          ]
        },
      ]
    },
    {
      label: "Categoria",
      key: "category",
      children: [
        {
          type: "group",
          key: "people",
          children: [
            {
              label: "Desenvolvimentp de Software",
              key: "narrator"
            },
            {
              label: "Ciencias Dados",
              key: "narrator"
            },
            {
              label: "Educação",
              key: "narrator"
            },
            {
              label: "Engenharia",
              key: "narrator"
            },
          ]
        },
      ]
    },
    {
      label: "Nível de Escolaridade",
      key: "scholarShipLevel",
      children: [
        {
          type: "group",
          key: "people",
          children: [
            {
              label: "Graduação",
              key: "narrator"
            },
            {
              label: "Pós-graduação",
              key: "narrator"
            },
            {
              label: "Mestrado",
              key: "narrator"
            },
            {
              label: "Doutorado",
              key: "narrator"
            },
          ]
        },
      ]
    }
  ];

  function renderMenuLabel(option) {
    if ("href" in option) {
      return h("a", { href: option.href, target: "_blank" }, [
        option.label
      ]);
    }
    return option.label;
  }

  function renderMenuIcon(option) {
    if (option.key === "sheep-man")
      return true;
    if (option.key === "food")
      return null;
    return h(NIcon, null, { default: () => h(BookmarkOutline) });
  }

  function expandIcon() {
    return h(NIcon, null, { default: () => h(CaretDownOutline) });
  }

  export default defineComponent({
    components: {
      ListJobs,
    },

    setup(){
      return {
        menuOptions,
        collapsed: ref(false),
        renderMenuLabel,
        renderMenuIcon,
        expandIcon,

        value: ref(null),
        options: [
          {
            label: "Everybody's Got Something to Hide Except Me and My Monkey",
            value: 'song0',
            disabled: true
          },
          {
            label: 'Drive My Car',
            value: 'song1'
          },
          {
            label: 'Norwegian Wood',
            value: 'song2'
          },
          {
            label: "You Won't See",
            value: 'song3',
            disabled: true
          },
        ]
      }
    }
  })

</script>

<!-- TODO -->
<!-- - adicionar os botoes no side bar como no figma -->
<!-- - terminar de estilizar a seleção de localização e adicionar um botão para salvar a locaçização selecionada na busca -->
<!-- - adicionar um botão que leva para a pagina de cadastro de vagas da Ju -->
<!-- - adicionar um olá, Fulano -->
<!-- - alterar cor do menu no canto superior direito para torna-lo mais visível -->
