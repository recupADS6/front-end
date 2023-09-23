<template>
  <div class="list-job-content">
    <div>
      <n-h1>Jobs ListJobs</n-h1>
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane name="jobs-open" tab="Abertas">
        <div class="jobs-section">
        <n-card class="jobs-card" title="Card" size="large">
          Card Content
        </n-card>
      </div>
      </n-tab-pane>
      <n-tab-pane name="complted-jobs" tab="Concluidas">
        <div class="jobs-section">
        <n-card class="jobs-card" title="Card" size="large">
          Card Content
        </n-card>
      </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script>
  import { NH1, NCard } from 'naive-ui'
  import { onMounted, ref } from 'vue'
  import { getAllJobs } from '../services/jobsService.js'

  export default {
    name: "ListJobs",
    components: {
      NCard,
      NH1
    },

    setup () {
      const jobsList = ref([]);

      onMounted(async () => {
        jobsList.value = await getAllJobs()
        console.log(jobsList.value.data)
      });

      return {
        jobsList,
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

  .jobs-card {
    background-color: blueviolet;
  }

  .list-job-content {
    margin-left: 25px;
    margin-right: 5px;
  }
</style>