<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label="false"
  >
    <n-grid :span="100" :x-gap="24">
      <n-form-item-gi :span="12" label="Título da Vaga" prop="title">
        <n-input v-model:value="model.title" placeholder="Título da Vaga" />
      </n-form-item-gi>

      <n-form-item-gi :span="12" label="Nível da Vaga" prop="level">
        <n-select
          v-model:value="model.level"
          placeholder="Nível"
          :options="selectOptions"
        />
      </n-form-item-gi>

      <n-form-item-gi :span="24" label="Descrição da Vaga" prop="description">
        <n-input
          v-model:value="model.description"
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
</template>

<script>
import { defineComponent, ref } from 'vue';
import { create } from "../services/jobsService.js";
import { useNotification } from 'naive-ui';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const formRef = ref(null);
    const notification = useNotification();

    const model = ref({
      title: '',
      level: '',
      type: '',
      category: '',
      scholarLevel: '',
      location: '',
      description: '',
      cha: '',
      status: 'Aberta',
    });

    const selectOptions = ['Júnior', 'Pleno', 'Sênior'].map(v => ({ label: v, value: v }));

    const rules = {
      title: {
        required: true,
        trigger: ['blur', 'input'],
        message: 'Por favor, insira o título da vaga'
      },
      description: {
        required: true,
        trigger: ['blur', 'input'],
        message: 'Por favor, insira a descrição da vaga'
      },
      level: {
        required: true,
        trigger: ['blur', 'change'],
        message: 'Por favor, selecione o nível da vaga'
      },
    };

    async function submitForm() {
      console.log('Formulário enviado:', model.value);
      try {
        await create(model.value);
        notification.success({
          title: 'Sucesso',
          description: 'Vaga cadastrada com sucesso!',
          duration: 3000,
        });
        setTimeout(() => {
          router.push({ name: 'dashboard-page' });
        }, 3000);
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
      }
    }

    async function cancelForm() {
      router.push({ name: 'dashboard-page' });
    }

    return {
      formRef,
      model,
      selectOptions,
      rules,
      submitForm,
      cancelForm,
    };
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