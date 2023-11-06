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
      <n-button  :loading="loadingScraping" color="#5380b8"  @click="sendMessage">
        <template #icon>
          <n-icon>
            <search-icon />
          </n-icon>
        </template>
        Scraping
      </n-button>
      </n-space>
    </div>

    <div v-if="candidatoInfo.length > 0">
      <n-h1>Candidatos</n-h1>
        <n-card>
            <n-card v-for="(codigo, index) in candidatoInfo.slice(0, 8)" :key="index">
              <div class="candidate-container">
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
      SearchIcon,
    },
    setup() {
    const job = ref(null);
    const route = useRoute()
    const showModalDelete = ref(false);
    const loadingScraping = ref(false)
    window.$message = useMessage()
    const router = useRouter();
    const cargo = ref('');
    const conhecimento = ref('');
    const habilidade = ref(''); 
    const atitude = ref(''); 
    const conhecimentos = ref([]);
    const habilidades = ref([]); 
    const atitudes = ref([]); 
    const candidatoInfo = ref([]);

    const fetchJobDetails = async () => {
      try {
        console.log("Tentando obter o trabalho com o ID:", route.params.id);
        const jobId = route.params.id;
        console.log("Fetching job details for ID:", jobId);
        job.value = await getJobById(jobId);
        cargo.value = job.value.jobTitle;
        conhecimento.value = job.value.cha.conhecimento.content;
        habilidade.value = job.value.cha.habilidade.content;
        atitude.value = job.value.cha.atitude.content;

        // console.log("cargo", cargo)
        // console.log("conhecimentos", conhecimento)
        // console.log("habilidades", habilidade)
        // console.log("atitudes", atitude)
        // console.log("Job details obtained:", job.value);
        
      } catch (error) {
        console.error('Erro ao obter os detalhes do trabalho:', error);
      }
    };

    onMounted(fetchJobDetails);

    const onPositiveClick = async () =>{
      try {
      const jobId = route.params.id;
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
      conhecimento,
      habilidade,
      atitude,
      conhecimentos,
      habilidades,
      atitudes,
      candidatoInfo,      
    };
  },
    methods:{

    async sendMessage () {
    this.loadingScraping = true; 
     //   console.log(`PERGUNTA AO CHATGPT (${this.cargo})${this.conhecimento}, ${this.habilidade}, ${this.atitude}`)
      try {
        const userMessage = 
        `Poderia por favor separar as plavras chaves separadament dos Conhecimento, Habilidades e Atitudes dessa vaga (${this.cargo}) :
          ${this.conhecimento}, 
          ${this.habilidade}, 
          ${this.atitude},

          no seguinte formato:
          {"conhecimentos": ["palavra chave", "palavra chave" ...], "habilidades":  ["palavra chave", "palavra chave" ...], "atitudes": ["palavra chave", "palavra chave" ...]}
          `;

        await this.askToChat(userMessage);
        
        this.userMessage = '';

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessage = data.response;

        //console.log("RESPOSTA CHATGPT : \n", responseMessage)

        const parsedResponse = JSON.parse(responseMessage);

        //console.log("RESPOSTA EM JSON : \n", parsedResponse )

        this.conhecimentos = parsedResponse.conhecimentos;
        this.habilidades = parsedResponse.habilidades;
        this.atitudes = parsedResponse.atitudes;

        // console.log("CARGO: \n", this.cargo);
        // console.log("CONHECIMENTOS: \n", this.conhecimentos);
        // console.log("HABILIDADES: \n", this.habilidades);
        // console.log("ATITUDES: \n", this.atitudes);

        // formatação dos arrays como strings
        const conhecimentosStr = JSON.stringify(this.conhecimentos);
        const habilidadesStr = JSON.stringify(this.habilidades);
        const atitudesStr = JSON.stringify(this.atitudes);

        this.getScraping(this.cargo, conhecimentosStr, habilidadesStr, atitudesStr);

        } else {
          console.error('Erro ao enviar mensagem para o backend(chat push):', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } 
    },

    async getScraping  (cargo,conhecimentosStr,habilidadesStr,atitudesStr) {
      try {
        const requestObject = {
          cargo: `${cargo}`,
          conhecimentos: `${conhecimentosStr}`,
          habilidades: `${habilidadesStr}`,
          atitudes: `${atitudesStr}`
        };

        console.log(" REQUEST :", requestObject);

        const response = await fetch('http://localhost:7000/scraping', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(requestObject),
        });

          const data = await response.json();
          //console.log("RESPONSE DATA SCRAPING: \n", data);
          
          this.candidatoInfo = data;

          //console.log("CANDIDATOS: ", this.candidatoInfo);
          
      } catch (error) {
        console.error('Erro ao enviar a requisição para o backend:', error);
      } finally {
        this.loadingScraping = false;
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
</style>