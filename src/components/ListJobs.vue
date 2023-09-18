<template>
  <div>
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

  export default {
    name: "ListJobs",
    components: {
      NCard,
      NH1
    },
  }
</script>

<style>
  .jobs-section {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 70%;
  }

  .jobs-card {
    background-color: blueviolet;
  }
</style>