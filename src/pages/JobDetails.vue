<template>
  <header-menu></header-menu>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
    <div v-if="job" >
    <n-h1>{{ job.jobTitle }}</n-h1>
    <n-card>
      <n-space vertical>
        <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
        <n-text><strong>Conhecimentos:</strong> {{ job.cha.conhecimento.content }}</n-text>
        <n-text><strong>Habilidades:</strong> {{ job.cha.habilidade.content }}</n-text>
        <n-text><strong>Atitudes:</strong> {{ job.cha.atitude.content }}</n-text>
        <n-text><strong>Descrição</strong> {{ job.jobDescription }}</n-text>
      </n-space>
    </n-card>
    
    <div class="button-group">
      <n-space>
        <n-button type="warning"  @click="editJob" icon-placement="left">
        <template #icon>
          <n-icon>
            <pen-icon />
          </n-icon>
        </template>
        Editar
      </n-button>
      <n-button type="error" @click="editJob" icon-placement="left">
        <template #icon>
          <n-icon>
            <trash-icon />
          </n-icon>
        </template>
        Excluir
      </n-button>


      </n-space>
      </div>
   </div>
  </n-layout-content>
  </n-layout>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import { NButton, NCard, NText, NH1 } from 'naive-ui';
  import { getJobById } from '../services/jobsService.js';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { Trash as TrashIcon, PencilSharp as PenIcon} from "@vicons/ionicons5";

  export default {
    components: {
      HeaderMenu,
      NButton,
      NCard,
      NText,
      NH1,
      TrashIcon,
      PenIcon
    },
    setup() {
    const job = ref(null);
    const route = useRoute()

    const fetchJobDetails = async () => {
      try {
        console.log("Tentando obter o trabalho com o ID:", route.params.id);
        const jobId = route.params.id; // Get the job ID from route params
        console.log("Fetching job details for ID:", jobId);
        job.value = await getJobById(jobId); // Fetch job details using the ID
        console.log("Job details obtained:", job.value);
      } catch (error) {
        console.error('Erro ao obter os detalhes do trabalho:', error);
      }
    };

    onMounted(fetchJobDetails);

    const editJob = async () => {
      // Implemente a lógica para redirecionar para a página de edição da vaga
    };

    const deleteJob = async () => {
      // Implemente a lógica para exclusão da vaga
    };

    return {
      job,
      editJob,
      deleteJob,
    };
  },

  };
</script>

<style scoped>
h1 {
  text-align: center;
}
.n-layout-content {
  background-color: #efefef ;
  height: 90vh;
}
.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}
button{
  border: none;
  border-radius: 4px;

}

</style>