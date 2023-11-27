<template>
  <header-menu></header-menu>
  <n-layout>
    <n-layout-content content-style="padding: 24px;">
    <div v-if="job" >
    <n-h1>{{ job.jobTitle }}</n-h1>
    <n-card>
      <n-space vertical>
        <n-text><strong>Nível:</strong> {{ job.jobLevel }}</n-text>
        <n-text><strong>Conhecimentos:</strong> {{ job.kaa.knowledge.content }}</n-text>
        <n-text><strong>Habilidades:</strong> {{ job.kaa.ability.content }}</n-text>
        <n-text><strong>Atitudes:</strong> {{ job.kaa.attitude.content }}</n-text>
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
      </n-space>
    </div>

    <div v-if="candidatos && Array.isArray(candidatos)">
      <n-h1>Candidatos</n-h1>

      <n-card >
      <n-collapse>
        <n-collapse-item title="Filtro" name="1" >
          <template #header >
            <div class="header">
              Filtro
            </div>
          </template>
          <div>    
            <n-text>Porcentagem Mínima:</n-text>
            <n-slider v-model:value="minPercentage" :step="1" :max="100" />
            <n-input-number v-model:value="minPercentage" size="small" />
        
            <n-text>Porcentagem Máxima:</n-text>
            <n-slider v-model:value="maxPercentage" :step="1" :min="0" :max="100" />
            <n-input-number v-model:value="maxPercentage" size="small" />
          </div>
        </n-collapse-item>
      </n-collapse>
      </n-card>
      <n-space vertical>

      <n-card >
        <n-card v-for="(codigo, index) in filteredCandidatos" :key="index">
          <div class="candidate-container" >
            <div class="circle">
              {{ index + 1 }}º
            </div>
          <div>
            <n-text class="candidate"><strong>{{ `Código: ` }}</strong> {{ codigo[0] }}</n-text>
          </div>
          <div class="match">
            <n-progress
              type="line"
              :percentage="parseFloat(codigo[1])"
              :indicator-placement="'inside'"
              :height="24"
            />
          </div>
          </div>
        </n-card>

      </n-card>
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
  import { ref, onMounted, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import baseURL from '../services/chatService.js';
  import { Trash as TrashIcon, PencilSharp as PenIcon} from "@vicons/ionicons5";

  export default {
    components: {
      HeaderMenu,
      NButton,
      NCard,
      NText,
      NH1,
      TrashIcon,
      PenIcon,
    },
    setup() {
    const job = ref(null);
    const jobId = ref(null);
    const route = useRoute()
    const showModalDelete = ref(false);
    const loadingScraping = ref(false)
    window.$message = useMessage()
    const router = useRouter();
    const cargo = ref('');
    const knowledge = ref('');
    const ability = ref(''); 
    const attitude = ref(''); 
    const knowledges = ref([]);
    const abilitys = ref([]); 
    const attitudes = ref([]);
    const rank  = ref('');
    const candidatoInfo = ref([]);
    const candidatos = ref([]);

    const minPercentage = ref(0);
    const maxPercentage = ref(100);

    const filteredCandidatos = computed(() => {
      return candidatos.value.filter(candidato => {
        const percentage = parseFloat(candidato[1]);
        return percentage >= minPercentage.value && percentage <= maxPercentage.value;
      });
    });

    const fetchJobDetails = async () => {
      try {
        console.log("Tentando obter o trabalho com o ID:", route.params.id);
        jobId.value = route.params.id;
        console.log("Fetching job details for ID:", jobId.value);
        job.value = await getJobById(jobId.value);
        cargo.value = job.value.jobTitle;
        knowledge.value = job.value.kaa.knowledge.content;
        ability.value = job.value.kaa.ability.content;
        attitude.value = job.value.kaa.attitude.content;
        rank.value = job.value.rank.id;

    try {
      const responseRank = await axios.get(`${baseURL}/job/${jobId.value}`);
      console.log('JOB:', responseRank.data);

      const match = responseRank.data.rank.id;
      console.log(" MATCH" , match)

      const responseMatch = await axios.get(`${baseURL}/rank/${match}`);
      console.log("TESTANDO RANK: \n", responseMatch.data)
      
        candidatos.value = responseMatch.data.value;
        console.log("Tipo de candidatos:", Array.isArray(candidatos.value));
        console.log("Candidatos:", candidatos.value);

    } catch (error) {
      console.error('Erro ao enviar a requisição para o backend:', error);
    }
       console.log("RANK:", rank);
        
      } catch (error) {
        console.error('Erro ao obter os detalhes do trabalho:', error);
      }
    };

    onMounted(fetchJobDetails);

    const onPositiveClick = async () =>{
      try {
        jobId.value = route.params.id;
      await deleteJob(jobId);
      window.$message.success('Vaga excluída com sucesso!');
      showModalDelete.value = false;

      router.push({ name: 'dashboard-page' });
      } catch (error) {
        console.error('Erro ao excluir a vaga:', error);
      } 
    };

  const redirectToEditJob = (jobId) => {
    router.push({ name: 'job-edit'});
    console.log("TESTE ID", jobId)
  };
 
    return {
      job,
      showModalDelete,
      loadingScraping,
      onPositiveClick,
      redirectToEditJob,
      cargo,
      knowledge,
      ability,
      attitude,
      knowledges,
      abilitys,
      attitudes,
      candidatoInfo,
      candidatos,
      rank,
      jobId,
      minPercentage,
      maxPercentage,
      filteredCandidatos
    };
  },
    methods:{

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
.candidate-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

}
.circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #52A352;
  font-size: 32px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-left: 56px;
}
.candidate {
  font-size: 20px;
  margin-right: 10px;
}
.match{
  width: 50%;
}

.header {
      font-size : 20px;
      margin-bottom: 10px
}
</style>