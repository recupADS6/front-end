<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label="false"
  >
    <n-grid :span="100" :x-gap="24">
      <n-form-item-gi :span="12" label="Título da Vaga" prop="jobTitle">
        <n-input v-model:value="model.jobTitle" placeholder="Título da Vaga" />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="Nível da Vaga" prop="jobLevel">
        <n-select
          v-model:value="model.jobLevel"
          placeholder="Nível"
          :options="selectOptions"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="Descrição da Vaga" prop="jobDescription">
        <n-input
          v-model:value="model.jobDescription"
          placeholder="Descrição da Vaga"
          type="textarea"
          :autosize="{
            minRows: 3,
            maxRows: 20
          }"
        />
      </n-form-item-gi>
    </n-grid>
    <div class="button-group">
      <n-button color="#B04141"    @click="cancelForm">Cancelar</n-button>
      <n-button  color="#F2C94C"  text-color="#607004" :loading="loading" @click="sendDescription" icon-placement="left" >
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>Aprimorar Descrição</n-button>
      <n-button color="#73A79A"  @click="sendMessage" :disabled="loading" icon-placement="left">
        <template #icon>
          <n-icon>
            <wand-icon />
          </n-icon>
        </template>Gerar CHA</n-button>
      <n-button  color="#27AE60"   class="register-button"  type="submit" @click="submitForm" :disabled="enviadoOuAprimorado">Cadastrar</n-button>
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
    const messageHistory = ref(''); // Variável para armazenar o histórico das mensagens    
    window.$message = useMessage()
    const formRef = ref<null>(null)
    const chatMessages = ref([]);
    const userMessage = ref('');
    const loadingBar = useLoadingBar();
    const loadingB = ref(false)
    const loadingRef = ref(false);
    const enviadoOuAprimorado = ref(true);
    return {
      messageHistory,
      handleClick() {
        loadingRef.value = true;
        setTimeout(() => {
          loadingRef.value = false;
        }, 2e3);
      },
      loading: loadingB,
      loadingB,
      loadingBar,
      chatMessages,
      userMessage,
      formRef,
      enviadoOuAprimorado,
      model: ref({
        jobTitle: '',
        jobDescription: '',
        text: '',  // Nova propriedade para armazenar o texto do usuário
        cha: null,  // Nova propriedade para armazenar o CHA gerado
        jobLevel: '',
        conhecimento: null,
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

   async sendDescription  () {
    this.loadingB = true; 
      try {
        
        const userMessage = `Aprimore a descrição da seguinte vaga ,como um descrição comum de sites de emprego: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

    this.userMessage = '';

    this.askUpgradeToChat(userMessage);
           // Simule um envio bem-sucedido
           setTimeout(() => {
          this.enviadoOuAprimorado = false;
          this.loadingB = false;
        }, 2000);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
        this.loadingB.value = false;
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

        console.log("APRIMORAR - PERGUNTA:" , message)

        if (response) {
          const data = await response.json();
          const responseMessageDescription = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageDescription });
          
        this.messageHistory += `\n${responseMessageDescription}\n`;
        this.upgradeDescription(this.messageHistory);

        // Atualizar "text" com o texto do chat
        this.model.text = responseMessageDescription;


          console.log("APRIMORAR - RESPOSTA CHAT GPT:" , responseMessageDescription)
        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      }
    },

    sendMessage() {
      this.loadingB = true;
      const userMessage = 
      `Seguindo a estrutura (CHA(Abreviação de Competências, Habilidades e Atitudes, será o título, sem nada mais escrito junto) , itens:- Competências...; - Habilidades...; - Atitudes...), Escreva Competências, Habilidades e Atitudes da seguinte vaga: 
        ${this.model.jobTitle}, 
        ${this.model.jobLevel}, 
        ${this.model.jobDescription}`;

      const message = userMessage;
      this.chatMessages.push({ role: 'user', content: message });
      this.userMessage = '';

      this.askChaToChat(message);
             // Simule um envio bem-sucedido
             setTimeout(() => {
          this.enviadoOuAprimorado = false;
          this.loadingB = false;
        }, 2000);

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
          
          
        this.messageHistory += `\n${responseMessageCha}\n`;
        this.upgradeDescription(this.messageHistory);
        this.model.cha = responseMessageCha;

          console.log("GERAR CHA - RESPOSTA CHAT GPT:" , responseMessageCha)
        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      }
    },

    async upgradeDescription (messageHistory) {
      this.model.jobDescription = messageHistory;

  // Atualizar "text" com o texto gerado aprimorado
  this.model.jobDescription = messageHistory;
  const requestBody = {
    content: this.model.text + '\n' + (this.model.cha || '')  // Incluir "text" e "cha"
  };
  console.log("new UPGRADE DESCRIPTION ", requestBody);

    },

    async sendServerResponseToBackend() {
      const requestBody = {
        content:  `${this.model.jobDescription}`
      };
      console.log("JOB DESCRIPTION(JSON) ", requestBody)
      try{
        const resposta = await axios.post(`${baseURL}/cha/add`, requestBody)
        const conhecimentoId = resposta.data.id

        console.log("Id do CHA: ", conhecimentoId)

        this.sendJobToBackend(conhecimentoId);

      }catch(error ) {
          console.error('Erro ao enviar resposta do servidor para o backend:', error);
        }
    },

    async sendJobToBackend(conhecimentoId){
      try {
        const jobData = {
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              jobLevel: this.model.jobLevel,
              jobStatus: this.model.jobStatus,
              conhecimento:{
                id: conhecimentoId,
              }
            };
            console.log("JOB:", jobData)

        const responseJob = await axios.post(`${baseURL}/job/add`, jobData);
        console.log('Resposta do servidor:', responseJob.data);
        window.$message.success('Vaga cadastrada com sucesso!');

        this.model = {
          jobTitle: null,
          jobDescription: null,
          jobLevel: null,
          conhecimento: "",
          jobStatus: "",
        };
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.');
      }
    },

    async submitForm(){
      try {
        // Chama a primeira função e espera que ela termine
      await this.sendServerResponseToBackend();



        console.log('CHA E JOB CADASTRADOS!.');
      } catch (error) {
        console.error('Erro', error);
      }
    },

    cancelForm() {
      this.model = {
          jobTitle: null,
          jobDescription: null,
          jobLevel: null,
          conhecimento: "",
          jobStatus: "",
        };
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
