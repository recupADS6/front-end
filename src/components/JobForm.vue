<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label=false
  >
  <n-grid :span="100" :x-gap="24">
    <n-form-item-gi :span="12" :label="inputLabel" prop="inputValue">
      <n-input v-model:value="model.inputValue" placeholder="Título da Vaga" />
    </n-form-item-gi>

    <n-form-item-gi :span="12" :label="selectLabel" prop="selectValue">
      <n-select
        v-model:value="model.selectValue"
        placeholder="Nível"
        :options="selectOptions"
      />
    </n-form-item-gi>

    <n-form-item-gi :span="24" label="Textarea" path="textareaValue">
      <n-input
        v-model:value="model.textareaValue"
        placeholder="Descrição da Vaga"
        type="textarea"
        :autosize="{
          minRows: 3,
          maxRows: 5
        }"
      />
    </n-form-item-gi>
    </n-grid>
    <div class="button-group" style="display: flex; justify-content: flex-end">
      <n-button color ="#bdbdbd" class="cancel-button" @click="cancelForm">Cancelar</n-button>
      <n-button color="#7ef0c0" class="register-button" type="submit">Cadastrar</n-button>
    </div>
  </n-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { FormInst } from 'naive-ui'

export default defineComponent({
  setup () {
    const formRef = ref<FormInst | null>(null)
    return {
      formRef,
      model: ref({
        inputValue: null,
        textareaValue: null,
        selectValue: null,
      }),
      inputLabel: 'Input Label',
      textareaLabel: 'Textarea Label',
      selectLabel: 'Select Label',
      selectOptions: ['Júnior', 'Pleno', 'Sênior'].map((v) => ({
        label: v,
        value: v
      })),
      rules: {
        inputValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Por favor, insira o título'
        },
        textareaValue: {
          required: true,
          trigger: ['blur', 'input'],
          message: 'Por favor, insira a descrição'
        },
        selectValue: {
          required: true,
          trigger: ['blur', 'change'],
          message: 'Por favor, insira o nível'
        },
      },
    }
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
