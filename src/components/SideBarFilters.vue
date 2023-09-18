<template>
  <div class="dashboard">
    <div class="header-page">
      <n-h1>Filtros</n-h1>

      <n-button type="primary" class="add-job-button">
        Adicionar Vaga
      </n-button>
    </div>

    <n-space vertical>
      <n-space vertical>
        <n-h2>Localização</n-h2>
        <div class="location-section">
          <n-select class="location-select" v-model:value="value" :options="options" />

          <n-button class="search-button" type="search">
            Search
          </n-button>
        </div>

        <n-switch class="side-filters-colapse" v-model:value="collapsed" />
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
  import { NIcon } from 'naive-ui'
  import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
  import ListJobs from './ListJobs.vue'

  const menuOptions = [
    {
      label: "Tipo Vaga de Emprego",
      key: "jobType",
      children:
      [
        {
          label: "Jovem Aprendiz",
          key: "jovem-aprendiz",
          checkbox: true,
        },
        {
          label: "Estágio",
          key: "estagio",
          checkbox: true,
        },
        {
          label: "Período Integral",
          key: "periodo-integral",
          checkbox: true,
        },
        {
          label: "Contrato",
          key: "contrato",
          checkbox: true,
        },
      ]
    },
    {
    label: "Categoria",
    key: "category",
    children:
      [
        {
          label: "Desenvolvimento de Software",
          key: "desenvolvimento-de-software"
        },
        {
          label: "Ciencias Dados",
          key: "cientista-de-dados"
        },
        {
          label: "Educação",
          key: "educacao"
        },
        {
          label: "Engenharia",
          key: "engenharia"
        },
      ]
    },
    {
      label: "Nível de Escolaridade",
      key: "scholarShipLevel",
      children:
      [
        {
          label: "Graduação",
          key: "graduacao"
        },
        {
          label: "Pós-graduação",
          key: "posGraduacao"
        },
        {
          label: "Mestrado",
          key: "mestrado"
        },
        {
          label: "Doutorado",
          key: "doutorado"
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

        value: ref("Escolha um estado"),
        options: [
          {
            label: "Acre - AC"
          },
          {
            label: "Amapá - AP"
          },
          {
            label: "Amazonas - AM"
          },
          {
            label: "Bahia - BA"
          },
          {
            label: "Ceará - CE"
          },
          {
            label: "Distrito Federal - DF"
          },
          {
            label: "Espírito Santo - ES"
          },
          {
            label: "Goiás - GO"
          },
          {
            label: "Maranhão - MA"
          },
          {
            label: "Mato Grosso - MT"
          },
          {
            label: "Mato Grosso do Sul - MS"
          },
          {
            label: "Minas Gerais - MG"
          },
          {
            label: "Pará - PA"
          },
          {
            label: "Paraíba - PB"
          },
          {
            label: "Paraná - PR"
          },
          {
            label: "Pernambuco - PE"
          },
          {
            label: "Piauí - PI"
          },
          {
            label: "Rio de Janeiro - RJ"
          },
          {
            label: "Rio Grande do Norte - RN"
          },
          {
            label: "Rio Grande do Sul - RS"
          },
          {
            label: "Rondônia - RO"
          },
          {
            label: "Roraima - RR"
          },
          {
            label: "Santa Catarina - SC"
          },
          {
            label: "São Paulo - SP"
          },
          {
            label: "Sergipe - SE"
          },
          {
            label: "Tocantins - TO"

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

<style>
  .location-select {
    width: 80%;
    margin-left: 5px;
  }

  .search-button {
    margin-right: 5px;
    margin-left: 3px;
    width: 20%;
    background-color: #62A362;
  }

  .location-section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .side-filters-colapse {
    margin-top: 10px;
    margin-left: 5px;
  }

  .dashboard {
    margin: 1%
  }

  .add-job-button {
    margin-right: 5px;
    margin-left: 3px;
    width: 8.5rem;
    height: 2.5rem;
    background-color: #62A362;
  }

  .header-page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>