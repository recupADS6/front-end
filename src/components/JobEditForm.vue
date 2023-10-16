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
        <n-button color="#5380b8" @click="editJob">Editar</n-button>
      </div>
    </div>
  </template>
  
  <script>
  import { NButton, NForm, NFormItemGi, NInput, NSelect, useMessage } from 'naive-ui';
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getJobById, updateJob } from '../services/jobsService';
  
  export default {
    components: {
      NButton,
      NForm,
      NFormItemGi,
      NInput,
      NSelect,
    },
  
    setup() {
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
  

  
      const fetchJobDetails = async (jobId) => {
        try {
          const jobDetails = await getJobById(jobId);
          if (jobDetails) {
            model.value = jobDetails; // Preenche os campos com os detalhes da vaga
          } else {
            message.error('Erro ao obter os detalhes da vaga.');
          }
        } catch (error) {
          console.error('Erro ao obter os detalhes da vaga:', error);
        }
      };
  
      onMounted(() => {
        const jobId = route.params.id;
        if (jobId) {
          fetchJobDetails(jobId);
        }
      });
  
      const saveChanges = async () => {
        try {
          const jobId = route.params.id;
          await updateJob(jobId, model.value);
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
  