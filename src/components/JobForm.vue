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
      <n-button color="#7ef0c0" class="register-button" type="submit" @click="submitForm">Cadastrar</n-button>
    </div>
  </n-form>
  <pre>{{ JSON.stringify(model, null, 2) }}
</pre>
  <div>
    <div v-for="(message, index) in chatMessages" :key="index" :class="message.role">
      {{ message.content }}
    </div>
    <div>
      <input v-model="userMessage" @keyup.enter="sendMessage" placeholder="Digite sua mensagem">
      <button @click="sendMessage">Enviar</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref   } from 'vue'
import { useMessage } from 'naive-ui'
import axios from 'axios';
import baseURL from '../main.js';

export default defineComponent({
  setup() {
    window.$message = useMessage()
    const formRef = ref<null>(null)

    return {
      formRef,
      model: ref({
        jobTitle: '',
        jobDescription: '',
        jobLevel: '',
        cha: '',
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
  async submitForm() {
      
      try {
        const response = await axios.post(`${baseURL}/job/add`, this.model);
        console.log('Resposta do servidor:', response.data);
        window.$message.success('Vaga cadastrada com sucesso!')

        this.model = {
          jobTitle: null,
          jobDescription: null,
          jobLevel: null,
          cha:"",
          jobStatus: "",
        };
      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.')

      }
    },
    cancelForm() {}
  }
})
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
