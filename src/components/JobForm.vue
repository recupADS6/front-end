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
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const formRef = ref<null>(null)
    return {
      formRef,
      model: ref({
        jobTitle: null,
        jobDescription: null,
        jobLevel: null,
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
  methods: {
    submitForm() {
      console.log('Dados do formulário:', this.model);
      // ação de envio do formulário aqui
    },
    cancelForm() {
      // rota para retornar
    },
  },
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
