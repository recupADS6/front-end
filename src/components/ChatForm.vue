<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label="true"
    :show-placeholder="false"
  >
    <n-grid :span="100" :x-gap="24">
      <n-form-item-gi :span="12" label="Título da Vaga" prop="jobTitle">
        <n-input v-model:value="model.jobTitle" placeholder="" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Nível da Vaga" prop="jobLevel">
        <n-select
          v-model:value="model.jobLevel"
          placeholder=""
          :options="selectOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Descrição da Vaga" prop="jobDescription">
        <n-input
          v-model:value="model.jobDescription"
          placeholder=""
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 20
          }"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Conhecimentos" prop="conhecimento">
        <n-input
          v-model:value="model.cha.conhecimento"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Habilidades" prop="habilidades">
        <n-input
          v-model:value="model.cha.habilidade"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
      <n-form-item-gi :span="24" label="Atitudes" prop="atitudes">
        <n-input
          v-model:value="model.cha.atitude"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
    </n-grid>
    <div class="button-group">
      <n-modal
        v-model:show="showModalCancel"
        :mask-closable="false"
        preset="dialog"
        title="Cancelar"
        content="Tem certeza de que deseja cancelar? Todas as informações não salvas serão perdidas."
        positive-text="Confirmar"
        negative-text="Cancelar"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
      />
      <n-button color="#B04141"  @click="showModalCancel = true">Cancelar</n-button>
      <n-button  color="#F2C94C"  text-color="#607004" :loading="loadingUpgrade" @click="sendDescription" icon-placement="left">
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>
        Aprimorar Descrição
      </n-button>
      <n-button color="#73A79A"  @click="sendMessage" :loading="loadingGenerate" icon-placement="left">
        <template #icon>
          <n-icon>
            <wand-icon />
          </n-icon>
        </template>
        Gerar CHA
      </n-button>
      <n-button
      color="#F2C94C"
      text-color="#607004"
      :loading="loadingUpgradeCha"
      @click="sendCha"
      :disabled="!isChaComplete"
      icon-placement="left"
    >
      <template #icon>
        <n-icon>
          <sparkles-icon />
        </n-icon>
      </template>
      Aprimorar CHA
     </n-button>
      <n-modal
          v-model:show="showModalSubmit"
          :mask-closable="false"
          preset="dialog"
          title="Confirmar Cadastro"
          content="Confirmar o cadastro da vaga?"
          positive-text="Confirmar"
          negative-text="Cancelar"
          @positive-click="submitForm"
          @negative-click="cancelForm"
      />
      <n-button  color="#5380b8" :loading="loadingUpgrade" @click="getScraping">Scraping</n-button>
      <n-button  color="#27AE60" type="submit" @click="showModalSubmit =true" :disabled="enviadoOuAprimorado">Cadastrar</n-button>
    </div>
  </n-form>
</template>

<script>
import { defineComponent, ref} from 'vue'
import { useMessage, useLoadingBar } from 'naive-ui'
import axios from 'axios';
import baseURL from '../services/chatService.js';
import { SparklesSharp as SparklesIcon, ColorWand as WandIcon } from "@vicons/ionicons5";

export default defineComponent({
  components: {
    SparklesIcon,
    WandIcon
  },
  setup() {
    const messageHistory = ref('');   
    window.$message = useMessage()
    const formRef = ref<null>(null)
    const chatMessages = ref([]);
    const userMessage = ref('');
    const loadingBar = useLoadingBar();
    const loadingUpgrade = ref(false)
    const loadingUpgradeCha = ref(false)
    const loadingGenerate = ref(false)
    const enviadoOuAprimorado = ref(true);
    const showModalSubmit = ref(false)
    const showModalCancel = ref(false);
    return {
      messageHistory,
      showModalCancel,
      showModalSubmit,
      loadingUpgrade,
      loadingUpgradeCha,
      loadingGenerate,
      loadingBar,
      chatMessages,
      userMessage,
      formRef,
      enviadoOuAprimorado,
      model: ref({
        jobTitle: '',
        jobDescription: '',
        cha:{
          conhecimento:"",
          habilidade:"",
          atitude:""
        },
        jobLevel: '',
        jobStatus: 'Aberta',
      }),
      selectOptions: ['Júnior', 'Pleno', 'Sênior'].map((v) => ({
        label: v,
        value: v
      })),
      rules: {
        jobTitle: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Por favor, insira o título da vaga'
        },
        jobDescription: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Por favor, insira a descrição da vaga'
        },
        jobLevel: {
          required: true,
          trigger: ['blur', 'change'],
          message: 'Por favor, selecione o nível da vaga'
        },
      },
    }
  },
  methods:{

    isChaComplete() {
      if (this.model.cha.conhecimento && this.model.cha.habilidade && this.model.cha.atitude === "") {
        return false;
      }
      return true;
    },

   async sendDescription  () {
    this.loadingUpgrade = true; 
      try {
        const userMessage = `Aprimore a descrição da seguinte vaga ,como um descrição comum de sites de emprego: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        this.askUpgradeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askUpgradeToChat(message) {
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
          const responseMessageDescription = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageDescription });
          
        this.messageHistory += `\n${responseMessageDescription}\n`;
        this.upgradeDescription(this.messageHistory);
        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgrade = false; 
        this.enviadoOuAprimorado = false;
      }
    },

    async upgradeDescription (messageHistory) {
      this.model.jobDescription = messageHistory;

      const requestBody = {
        content: this.model.jobDescription
      };
      console.log("NEW DESCRIPTION ", requestBody);
    },

    async sendMessage () {
      this.loadingGenerate = true;
      const userMessage = 
      `Seguindo a estrutura: 

      Conhecimentos:
      - item 1;
      - Item2.
      etc.

      Habilidades:
      - item 1;
      - Item2.
      etc.

      Atitudes:
      - item 1;
      - Item2.
      etc. 
      
    Escreva Conhecimentos, Habilidades e Atitudes da seguinte vaga: 
        ${this.model.jobTitle}, 
        ${this.model.jobLevel}, 
        ${this.model.jobDescription}`;

      const message = userMessage;
      this.chatMessages.push({ role: 'user', content: message });
      this.userMessage = '';

      this.askChaToChat(message);

    },

    async sendCha () {
            if (!this.isChaComplete) {
        window.$message.error('Preencha todos os campos de CHA antes de aprimorar.');
        return;
      }
    this.loadingUpgradeCha = true; 
      try {
        const userMessage = 
        `Seguindo a estrutura: 

        Conhecimentos:
        - item 1;
        - Item2.
        etc.

        Habilidades:
        - item 1;
        - Item2.
        etc.

        Atitudes:
        - item 1;
        - Item2.
        etc. 

        Aprimore os Conhecimentos, Habilidades e Atitudes:
        ${this.model.cha.conhecimento},
        ${this.model.cha.habilidade},
        ${this.model.cha.atitude},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        this.askChaToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askChaToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        console.log("GERAR CHA - PERGUNTA:" , message)

        if (response) {
          const data = await response.json();
          const responseMessageCha = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageCha });

          console.log("GERAR CHA - RESPOSTA CHAT GPT:" , responseMessageCha)

          // Extrair as informações de conhecimento, habilidade e atitude
          this.extractCHA(responseMessageCha);


        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerate = false; 
        this.enviadoOuAprimorado = false;
        this.loadingUpgradeCha=false;
      }
    },

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
      } finally {
        this.loadingGenerate = false; 
        this.enviadoOuAprimorado = false;
        this.loadingUpgradeCha=false;
      }
    },


    async extractCHA(responseMessageCha) {
    const sections = responseMessageCha.split('\n');

    const conhecimento = [];
    const habilidade = [];
    const atitude = [];

    let currentCategory = '';

    for (const section of sections) {
      if (section.startsWith('Conhecimentos:')) {
        currentCategory = 'conhecimento';
      } else if (section.startsWith('Habilidades:')) {
        currentCategory = 'habilidade';
      } else if (section.startsWith('Atitudes:')) {
        currentCategory = 'atitude';
      } else {
        if (currentCategory === 'conhecimento') {
          conhecimento.push(section.trim());
        } else if (currentCategory === 'habilidade') {
          habilidade.push(section.trim());
        } else if (currentCategory === 'atitude') {
          atitude.push(section.trim());
        }
      }
    }

    console.log('Conhecimentos:', conhecimento);
    console.log('Habilidades:', habilidade);
    console.log('Atitudes:', atitude);

    this.model.cha = {
      conhecimento: conhecimento.join('\n'),
      habilidade: habilidade.join('\n'),
      atitude: atitude.join('\n')
    };
    },

    async sendServerResponseToBackend() {
      const requestBodyC = {
        content:  `${this.model.cha.conhecimento}`
      };
      const requestBodyH = {
        content:  `${this.model.cha.habilidade}`
      };
      const requestBodyA = {
        content:  `${this.model.cha.atitude}`
      };
      try{
        const respostaC = await axios.post(`${baseURL}/con/add`, requestBodyC)
        const respostaH = await axios.post(`${baseURL}/hab/add`, requestBodyH)
        const respostaA = await axios.post(`${baseURL}/ati/add`, requestBodyA)

        const conhecimentoId = respostaC.data.id
        const habilidadeId = respostaH.data.id
        const atitudeId = respostaA.data.id

        const requestBodyCHA = {
          conhecimento: { id: `${conhecimentoId}` },
          habilidade: { id: `${habilidadeId}` },
          atitude: { id: `${atitudeId}` }
        };

        const respostaCha = await axios.post(`${baseURL}/cha/add`, requestBodyCHA)

        return respostaCha.data.id;

      }catch(error ) {
          console.error('Erro ao enviar resposta do servidor para o backend:', error);
        }
    },

    async sendJobToBackend(chaId){
      try {
        const jobData = {
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              jobLevel: this.model.jobLevel,
              jobStatus: this.model.jobStatus,
              cha:{
                id: chaId,
              }
            };
        const responseJob = await axios.post(`${baseURL}/job/add`, jobData);
        console.log('Resposta do servidor:', responseJob.data);
        window.$message.success('Vaga cadastrada com sucesso!');

        this.clearModel();

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.');
      }
    },

    async clearModel (){
      this.model = {
              jobTitle: null,
              jobDescription: null,
              jobLevel: null,
              jobStatus: "",
              cha: {
                conhecimento: "",
                habilidade:"",
                atitude:"",
              },
            };
    },

    async submitForm(){
      try {
      const chaId = await this.sendServerResponseToBackend();
      await this.sendJobToBackend(chaId);
      this.showModalSubmit = false
      } catch (error) {
        console.error('Erro', error);
      }
    },

    cancelSubmit () {
      this.showModalSubmit = false
    },

    onPositiveClick () {
      this.clearModel();
      this.$router.push({ name: 'dashboard-page' });
        this.showModalCancel = false
      },
    onNegativeClick () {
      this.showModalCancel = false
    },

    cancelForm() {
      this.clearModel();
      this.$router.push({ name: 'dashboard-page' });
    }
  }
});
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
button{
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
