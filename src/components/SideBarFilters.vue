<template>
  <div class="dashboard">
    <div class="header-page">
      <n-h1>Filtros</n-h1>
    </div>

    <n-space vertical>
      <n-layout has-sider>
        <n-layout-sider :class="{ 'layout-sider': !collapsed }" bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed" show-trigger @collapse="collapsed = true" @expand="collapsed = false">
          <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" :render-label="renderMenuLabel" :expand-icon="expandIcon" />

          <n-space justify="space-between" class="button-spaces" v-if="!collapsed">
            <n-button tertiary @click="clearFilterOptions">Limpar filtros</n-button>
            <n-button type="primary" style="width: 108px" @click="filterOptions">Filtrar</n-button>
          </n-space>
        </n-layout-sider>

        <n-layout>
          <list-jobs :filtered-options="checkboxValues" :jobs="filteredJobs"/>
        </n-layout>
      </n-layout>
    </n-space>
  </div>
</template>

<script>
import { CaretDownOutline } from '@vicons/ionicons5';
import { NCheckbox, NIcon, NLayout, NLayoutSider, NMenu, NSpace, NButton } from 'naive-ui';
import ListJobs from './ListJobs.vue';
import menuOptions from "../utils/menuOptions.js";
import { getAllJobs } from '../services/jobsService.js';
import { onMounted, ref, h } from 'vue';
import { filterJobs, toggleCheckbox } from "../helpers/jobFilters.js"

export default {
  components: {
    ListJobs,
    NMenu,
    NSpace,
    NLayout,
    NLayoutSider,
    NButton
  },

  setup() {
    const checkboxValues = ref([]);
    const filteredJobs = ref([]);
    const allJobs = ref([]);
    const collapsed = ref(false);

    const isCheckboxChecked = option => checkboxValues.value.includes(option.value);

    function renderMenuLabel(option) {
      if ("checkbox" in option) {
        return h(
          NCheckbox,
          {
            checked: isCheckboxChecked(option),
            onChange: () => toggleCheckbox(checkboxValues.value, option)
          },
          () => [option.label]
        );
      }
      return option.label;
    }

    function expandIcon() {
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    }

    function applyFilters() {
      filteredJobs.value = filterJobs(allJobs.value, checkboxValues.value);
    }

    function clearFilterOptions() {
      checkboxValues.value = [];
      applyFilters();
    }

    onMounted(async () => {
      allJobs.value = await getAllJobs();
      applyFilters();
    });

    return {
      menuOptions,
      collapsed,
      renderMenuLabel,
      checkboxValues,
      expandIcon,
      filterOptions: applyFilters,
      clearFilterOptions,
      filteredJobs
    };
  }
}
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

.layout-sider {
  max-width: 300px !important;
  width: 300px !important;
}

.button-spaces {
  padding: 1rem;
}
</style>
