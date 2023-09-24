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
            maxRows: 5
          }"
        />
      </n-form-item-gi>
    </n-grid>
    <div class="button-group">
      <n-button color="#bdbdbd" class="cancel-button" @click="cancelForm">Cancelar</n-button>
      <n-button color="#7ef0c0" class="register-button" type="submit" @click="sendMessage" :disabled="loading" >Cadastrar</n-button>
    </div>
  </n-form>
  <n-divider />
  <n-space>
    <n-card>
      <div v-for="(message, index) in chatMessages" :key="index" :class="message.role">
  <div v-if="message.role === 'AI'">
    {{ message.content }}
  </div>
</div>
  </n-card>
  </n-space>
</template>

<script>
import { defineComponent, ref   } from 'vue'
import { useMessage, useLoadingBar } from 'naive-ui'
import axios from 'axios';
import baseURL from '../main.js';

export default defineComponent({
  setup() {
    window.$message = useMessage()
    const loadingRef = ref(false);
    const formRef = ref<null>(null)
    const chatMessages = ref([]);
    const userMessage = ref('');
    const loadingBar = useLoadingBar();
    const loading = ref(false);
    return {
      handleClick() {
        loadingRef.value = true;
        setTimeout(() => {
          loadingRef.value = false;
        }, 2e3);
      },
      loading,
      loadingBar,
      chatMessages,
      userMessage,
      formRef,
      model: ref({
        jobTitle: '',
        jobDescription: '',
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

 sendMessage() {
  this.loadingBar.start();
  const userMessage = `Escreva Competências, Habilidades e Atitudes da seguinte vaga: 
    ${this.model.jobTitle}, 
    ${this.model.jobLevel}, 
    ${this.model.jobDescription}`;

  const message = userMessage;
  this.chatMessages.push({ role: 'user', content: message });
  this.userMessage = '';

  this.sendToBackend(message);
},

    async sendToBackend(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        console.log("(TESTE)PERGUNTA:" , message)

        if (response) {
          const data = await response.json();
          const responseMessage = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessage });
          

         this.sendServerResponseToBackend(responseMessage);

          console.log("RESPOSTA CHAT GPT:" , responseMessage)
        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      }
    },

  async sendServerResponseToBackend(responseMessage) {
    const requestBody = {
      content: responseMessage
    };
    console.log("(TESTE)RESPOSTA DO CHAT JSON: ", requestBody)
    try{
      const resposta = await axios.post(`${baseURL}/cha/add`, requestBody)
      const conhecimentoId = resposta.data.id

      console.log("RESPOSTAAAA: ", conhecimentoId)

      if (resposta){
        this.submitForm(requestBody);
      }
    }catch(error ) {
        console.error('Erro ao enviar resposta do servidor para o backend:', error);
      }
  },

  async submitForm(conhecimentoId) {
      try {
        const jobData = {
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              jobLevel: this.model.jobLevel,
              jobStatus: this.model.jobStatus,
              conhecimento: conhecimentoId, // Usar a resposta do backend
            };

        console.log("testeeeee:", jobData)

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
        this.loadingBar.finish();
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.');
      }
    },
        cancelForm() {}
      }
    });
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
 
.cancel-button {
  background-color: #bdbdbd;
  color: #000000;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}
.register-button {
  background-color: #7ef0c0;
  color: #000000;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
