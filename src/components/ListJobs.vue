<template>
  <div class="list-job-content">
    <div>
      <n-h1>Jobs ListJobs</n-h1>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="jobs-open" tab="Abertas">
        <n-space vertical>
          <div v-for="job in jobsFilled" :key="job.id">
            <n-card class="jobs-card" :title="job.title" size="large">
              <n-space vertical>
                <n-text><strong>Nível:</strong> {{ job.level }}</n-text>
                <n-text><strong>Tipo:</strong> {{ job.type }}</n-text>
                <n-text><strong>Categoria:</strong> {{ job.category }}</n-text>
                <n-text><strong>Nível de Formação</strong> {{ job.scholarLevel }}</n-text>
                <n-text><strong>CHA:</strong> {{ job.cha }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.description }}</n-text>
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
                <n-text><strong>Nível:</strong> {{ job.level }}</n-text>
                <n-text><strong>Tipo:</strong> {{ job.type }}</n-text>
                <n-text><strong>Categoria:</strong> {{ job.category }}</n-text>
                <n-text><strong>Nível de Formação</strong> {{ job.scholarLevel }}</n-text>
                <n-text><strong>CHA:</strong> {{ job.cha }}</n-text>
                <n-text><strong>Descrição</strong> {{ job.description }}</n-text>
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
  import { onMounted, ref } from 'vue'
  import { getAllJobs } from '../services/jobsService.js'

  export default {
    name: "ListJobs",
    components: {
      NCard,
      NH1,
      NText
    },

    setup () {
      const jobsList = ref([]);
      const jobsOpen = ref([]);
      const jobsFilled = ref([]);

      onMounted(async () => {
        jobsList.value = await getAllJobs()
        console.log(jobsList.value.data)

        jobsList.value.data.map (job => {
          if (job.status === 'open') {
            jobsOpen.value.push(job)
          } else {
            jobsFilled.value.push(job)
          }
        })
        console.log(jobsOpen.value)
        console.log(jobsFilled.value)
      });

      return {
        jobsList,
        jobsOpen,
        jobsFilled,
      }
    }
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