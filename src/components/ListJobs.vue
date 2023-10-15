<template>
  <div class="list-job-content">
    <div>
      <n-h1>Vagas</n-h1>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="jobs-open" tab="Abertas">
        <n-space vertical>
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
                 </template>
              <n-space vertical>
                <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
                <n-text><strong>CHA:</strong> </n-text>
                <n-text><strong>Conhecimentos:</strong> {{ job.cha.conhecimento.content }}</n-text>
                <n-text><strong>Habilidades:</strong> {{ job.cha.habilidade.content }}</n-text>
                <n-text><strong>Atitudes:</strong> {{ job.cha.atitude.content }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.jobDescription }}</n-text>
              </n-space>
            </n-card>
          </div>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="completed-jobs" tab="Concluídas">
        <n-space vertical>
          <div v-for="job in jobsOpen" :key="job.id">
            <n-card class="jobs-card" :title="job.title" size="large">
              <n-space vertical>
                <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
                <n-text><strong>CHA:</strong> </n-text>
                <n-text><strong>Conhecimentos:</strong> {{ job.cha.conhecimento.content }}</n-text>
                <n-text><strong>Habilidades:</strong> {{ job.cha.habilidade.content }}</n-text>
                <n-text><strong>Atitudes:</strong> {{ job.cha.atitude.content }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.jobDescription }}</n-text>
              </n-space>
            </n-card>
          </div>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
  import { NH1, NCard, NText } from 'naive-ui'
  import { onMounted, ref, watch } from 'vue'
  import { getAllJobs } from '../services/jobsService.js'
  import {AddCircleOutline as AddIcon } from "@vicons/ionicons5";
  import { useRouter } from 'vue-router';

  export default {
    name: "ListJobs",
    components: {
      NCard,
      NH1,
      NText,
      AddIcon,
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

    setup (props) {
      const router = useRouter(); 
      const redirectToJobDetailsPage = (id) => {
    router.push({ name: 'JobDetails', params: { id: id } });
    console.log("TESTE ID", id)
  };

      const jobsList = ref([]);
      const jobsOpen = ref([]);
      const jobsFilled = ref([]);

      console.log("props", props);

      onMounted(async () => {
        jobsList.value = await getAllJobs();

        jobsList.value.map (job => {
          if (job.status === 'open') {
            jobsOpen.value.push(job)
          } else {
            jobsFilled.value.push(job)
          }
        })
      });

      function updateLists(jobs) {
        jobsOpen.value = [];
        jobsFilled.value = [];

        jobs.forEach(job => {
          if (job.status === 'open') {
            jobsOpen.value.push(job);
          } else {
            jobsFilled.value.push(job);
          }
        });
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
        jobsList,
        jobsOpen,
        jobsFilled,
        customHeaderStyle: {
        background: '#e1f2e1',
        fontSize: '24px', 
        marginBottom: '10px'
      },
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
</style>