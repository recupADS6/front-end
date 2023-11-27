<template>
  <div class="list-job-content">
    <div>
      <n-h1>Vagas</n-h1>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="jobs-open" tab="Abertas">
        <n-space vertical>
          <div v-if="jobsOpen.length === 0">
            <n-text>Ops! Parece que ainda não há vagas abertas</n-text>
          </div>
          <div v-for="job in jobsOpen" :key="job.id">
            <n-card class="jobs-card" :title="job.jobTitle" size="large" content-style="true" :header-style="customHeaderStyle">
              <template #header-extra>
                <n-button type="primary" @click="redirectToJobDetailsPage(job.id)" >
                  <template #icon>
                    <n-icon>
                      <add-icon />
                    </n-icon>
                  </template>
                  Mais Informações
                </n-button>
                <n-tag type="info" :bordered="false" size="large">
                  Matching ...
                  <template #icon>
                    <n-icon :component="OutIcon" />
                  </template>
                </n-tag>
                </template>
              <n-space vertical>
                <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.jobDescription }}</n-text>
                <n-text><strong>Conhecimentos:</strong> {{ job.kaa.knowledge.content }}</n-text>
                <n-text><strong>Habilidades:</strong> {{ job.kaa.ability.content }}</n-text>
                <n-text><strong>Atitudes:</strong> {{ job.kaa.attitude.content }}</n-text>
              </n-space>
            </n-card>
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="completed-jobs" tab="Concluídas">
        <n-space vertical>
          <div v-if="jobsFilled.length === 0">
            <n-text>Ops! Parece que ainda não há vagas concluídas</n-text>
          </div>
          <div v-for="job in jobsFilled" :key="job.id">
            <n-card class="jobs-card" :title="job.jobTitle" size="large" content-style="true" :header-style="customHeaderStyle">

              <template #header-extra>
                <n-button type="primary" @click="redirectToJobDetailsPage(job.id)" >
                  <template #icon>
                    <n-icon>
                      <add-icon />
                    </n-icon>
                  </template>
                  Mais Informações
                </n-button>
                <n-tag type="success" :bordered="false" size="large">
                  Match Concluído
                  <template #icon>
                    <n-icon :component="CheckIcon" />
                  </template>
                </n-tag>
              </template>

              <n-space vertical>
                <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.jobDescription }}</n-text>
                <n-text><strong>Conhecimentos:</strong> {{ job.kaa.knowledge.content }}</n-text>
                <n-text><strong>Habilidades:</strong> {{ job.kaa.ability.content }}</n-text>
                <n-text><strong>Atitudes:</strong> {{ job.kaa.attitude.content }}</n-text>
              </n-space>
            </n-card>
          </div>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
import { NH1, NCard, NText, NTabs, NTabPane, NButton, NSpace } from 'naive-ui'
import { onMounted, ref, watch } from 'vue'
import axios from "axios";
import { AddCircleOutline as AddIcon} from "@vicons/ionicons5";
import { DownloadingOutlined as OutIcon, CheckCircleOutlineFilled as CheckIcon } from '@vicons/material';
import { useRouter } from 'vue-router';

export default {
  name: "ListJobs",
  components: {
    NCard,
    NH1,
    NText,
    NTabs,
    NTabPane,
    NButton,
    NSpace,
    AddIcon
  },
  props: {
    filteredOptions: {
      type: Array,
      required: true
    },
    jobs: {
      type: Array,
      required: true
    }
  },

  setup(props) {
    const router = useRouter();
    const redirectToJobDetailsPage = (id) => {
      router.push({ name: 'job-details', params: { id: id } });
      console.log("TESTE ID", id)
    };

    const jobsOpen = ref([]);
    const jobsFilled = ref([]);

    const customHeaderStyle = {
      background: '#e1f2e1',
      fontSize: '24px',
      marginBottom: '10px'
    };

    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:8090/job/`);
        const jobsList = response.data;

        if (jobsList) {
          jobsList.forEach(job => {
            if (job.jobStatus === 'open') {
              jobsOpen.value.push(job);
            } else {
              jobsFilled.value.push(job);
            }
          });
        }
      } catch (error) {
        console.error('Erro ao obter vagas:', error);
      }
    });

    function updateLists(newJobs) {
      jobsOpen.value = [];
      jobsFilled.value = [];

      if (newJobs) {
        newJobs.forEach(job => {
          if (job.jobStatus === 'open') {
            jobsOpen.value.push(job);
          } else {
            jobsFilled.value.push(job);
          }
        });
      }
    }

    watch(
      () => props.jobs,
      (newJobs) => {
        updateLists(newJobs);
      },
      { immediate: true }
    );

    return {
      redirectToJobDetailsPage,
      jobsOpen,
      jobsFilled,
      customHeaderStyle,
      OutIcon,
      CheckIcon
    }
  },
};
</script>


<style>
  .jobs-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 100%;
  }

  .list-job-content {
    margin-left: 25px;
    margin-right: 5px;
  }
  .cha {
    font-size: 16px;
  }
</style>