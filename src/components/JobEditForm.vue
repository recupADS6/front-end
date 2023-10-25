<template>
    <div>
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

      </n-form>
      <div class="button-group">
        <n-button color="#B04141"  @click="backHome">Voltar</n-button>
        <n-button color="#5380b8" @click="saveChanges">Editar</n-button>
      </div>
    </div>
  </template>
  
  <script>
  import { NButton, NForm, NFormItemGi, NInput, NSelect, useMessage } from 'naive-ui';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getJobById } from '../services/jobsService';
  import axios from 'axios';
import baseURL from '../services/chatService.js';
  
  export default {
    components: {
      NButton,
      NForm,
      NFormItemGi,
      NInput,
      NSelect,
    },
  
    setup() {
      const job = ref(null);
      const formRef = ref(null);
      const model = ref({
        jobTitle: '',
        jobDescription: '',
        cha: {
          conhecimento: '',
          habilidade: '',
          atitude: '',
        },
        jobLevel: '',
        jobStatus: 'open',
      });
      const route = useRoute();
      const router = useRouter();
      const message = useMessage();
  

      const fetchJobDetails = async () => {
      try {
        console.log("Tentando obter o trabalho com o ID:", route.params.id);

        const jobId = route.params.id;

        console.log("Fetching job details for ID:", jobId);

        job.value = await getJobById(jobId);
        const titulo = job.value.jobTitle;

        model.value = job.value;

        model.value.jobTitle = job.value.jobTitle;
        model.value.jobDescription = job.value.jobDescription;
        model.value.jobLevel = job.value.jobLevel;
        model.value.cha.conhecimento = job.value.cha.conhecimento.content;
        model.value.cha.habilidade = job.value.cha.habilidade.content;
        model.value.cha.atitude = job.value.cha.atitude.content;
        model.value.jobStatus = job.value.jobStatus;

            console.log('Conhecimentos:',  job.value.cha.conhecimento);
    console.log('Habilidades:',  job.value.cha.habilidade);
    console.log('Atitudes:',  job.value.cha.atitude);


        console.log("titulo", titulo)
        console.log("Job details obtained:", job.value);
      } catch (error) {
        console.error('Erro ao obter os detalhes do trabalho:', error);
      }
    };

    onMounted(fetchJobDetails);

  
      const saveChanges = async () => {
        try {
          const jobId = route.params.id; // Assuming this gets the correct job ID
          const updatedModel = { 
            id: jobId, // Make sure to include the job ID in the model
      jobTitle: model.value.jobTitle,
      jobLevel: model.value.jobLevel,
      jobDescription: model.value.jobDescription,
      cha: {
        conhecimento: model.value.cha.conhecimento.content,
        habilidade: model.value.cha.habilidade.content,
        atitude: model.value.cha.atitude.content
      },
      jobStatus: model.value.jobStatus
    };
    
console.log("SAVE CHANGES", updatedModel)

const responseJob = await axios.put(`${baseURL}/job/${jobId}`, updatedModel);
console.log('Resposta do servidor:', responseJob.data);
    //await jobUpdate(jobId, updatedModel);
          message.success('Alterações salvas com sucesso!');
          router.push({ name: 'dashboard-page' });
        } catch (error) {
          console.error('Erro ao salvar as alterações:', error);
          message.error('Erro ao salvar as alterações. Tente novamente.');
        }
      };
  
      return {
        formRef,
        model,
        saveChanges,
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
      };
    },
    methods:{
      backHome() {
      this.$router.push({ name: 'dashboard-page' });
    },  
    },
  };
  </script>
  
  <style scoped>
  .button-group {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  button {
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    margin-right: 10px;
  }
  </style>
  