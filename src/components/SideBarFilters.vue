<template>
  <div class="dashboard">
    <div class="header-page">
      <n-h1>Filtros</n-h1>
    </div>

    <n-space vertical>
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
  import { CaretDownOutline } from '@vicons/ionicons5';
  import {
    NCheckbox,
    NIcon,
    NLayout,
    NLayoutSider,
    NMenu,
    NSpace,
  } from 'naive-ui';
  import { defineComponent, h, ref } from 'vue';
  import ListJobs from './ListJobs.vue';
  import menuOptions from "../utils/menuOptions.js"
  import locationOptions from "../utils/locationOptions.js"

  const checkboxValues = ref([]);

  function renderMenuLabel(option) {
    if ("checkbox" in option) {
      return h(
        NCheckbox,
        {
          checked: checkboxValues.value[option.key],
          onChange: (value) => {
            if (value) {
              checkboxValues.value.push(option.key);
            } else {
              checkboxValues.value.pop(option.key);
            }
          },
        },
        () => [option.label]
      );
    }
    return option.label;
  }

  function expandIcon() {
    return h(NIcon, null, { default: () => h(CaretDownOutline) });
  }

  export default defineComponent({
    components: {
      ListJobs,
      NMenu,
      NSpace,
      NLayout,
      NLayoutSider,
    },

    setup(){
      return {
        menuOptions,
        collapsed: ref(false),
        renderMenuLabel,
        checkboxValues,
        expandIcon,
        value: ref("Escolha um estado"),
        locationOptions,
      }
    }
  })
</script>

<style>
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