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
      <n-modal
        v-model:show="showModalDelete"
        :mask-closable="false"
        preset="dialog"
        title="Excluir"
        content="Tem certeza de que deseja excluir essa vaga?"
        positive-text="Confirmar"
        negative-text="Cancelar"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
      />
      <n-space>
        <n-button color="#B04141"  @click="backHome">Voltar</n-button>
        <n-button type="warning"  @click="redirectToEditJob" icon-placement="left">
        <template #icon>
          <n-icon>
            <pen-icon />
          </n-icon>
        </template>
        Editar
      </n-button>
      <n-button type="error" @click="showModalDelete =true" icon-placement="left">
        <template #icon>
          <n-icon>
            <trash-icon />
          </n-icon>
        </template>
        Excluir
      </n-button>
      <n-button  color="#5380b8"  @click="getScraping">
        <template #icon>
          <n-icon>
            <search-icon />
          </n-icon>
        </template>
        Scraping
      </n-button>
      </n-space>
      </div>
   </div>
  </n-layout-content>
  </n-layout>
</template>

<script>
  import HeaderMenu from '../components/HeaderMenu.vue';
  import { NButton, NCard, NText, NH1,useMessage } from 'naive-ui';
  import { getJobById, deleteJob } from '../services/jobsService.js';
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { Trash as TrashIcon, PencilSharp as PenIcon, Search as SearchIcon} from "@vicons/ionicons5";

  export default {
    components: {
      HeaderMenu,
      NButton,
      NCard,
      NText,
      NH1,
      TrashIcon,
      PenIcon,
      SearchIcon
    },
    setup() {
    const job = ref(null);
    const route = useRoute()
    const showModalDelete = ref(false);
    window.$message = useMessage()
        const router = useRouter();

    const fetchJobDetails = async () => {
      try {
        console.log("Tentando obter o trabalho com o ID:", route.params.id);
        const jobId = route.params.id;
        console.log("Fetching job details for ID:", jobId);
        job.value = await getJobById(jobId);
        console.log("Job details obtained:", job.value);
      } catch (error) {
        console.error('Erro ao obter os detalhes do trabalho:', error);
      }
    };

    onMounted(fetchJobDetails);

    const onPositiveClick = async () =>{
      try {
      const jobId = route.params.id; // Get the job ID from route params
      await deleteJob(jobId);
      window.$message.success('Vaga excluída com sucesso!');
      showModalDelete.value = false;  // Update the ref directly

    router.push({ name: 'dashboard-page' });
    } catch (error) {
      console.error('Erro ao excluir a vaga:', error);
    } 
  };

  const redirectToEditJob = (id) => {
    router.push({ name: 'job-edit', params: { id: id } });
    console.log("TESTE ID", id)
  };
 
    return {
      job,
      showModalDelete,
      onPositiveClick,
      redirectToEditJob
    };
  },
    methods:{
      async getScraping() {
      try {
        const response = await fetch('http://localhost:7000/scraping', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: this.model.jobTitle
        });
        if (response) {
          console.log(response)                    
        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
    }
    },

    async deleteJ (jobId) {
      try {
        await deleteJob(jobId);
        window.$message.success('Vaga excluída com sucesso!');

      } catch (error) {
        console.error('Erro ao excluir a vaga:', error);
      } 
    },

    onNegativeClick () {
      this.showModalDelete = false
      this.$router.push({ name: 'dashboard-page' });
    },
    backHome() {
      this.$router.push({ name: 'dashboard-page' });
    },    
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