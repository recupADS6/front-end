<template>
  <div>
    <header-menu></header-menu>
    <n-layout>
      <n-layout-content content-style="padding: 24px;">
        <div class="cadastro-vaga">
          <h1>Cadastro de Vagas</h1>
            <job-form></job-form>
        </div>
        CONTENT
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script>
import HeaderMenu from './HeaderMenu.vue';
import JobForm from './JobForm.vue';

export default {
  components: {
    HeaderMenu,
    JobForm
  },
  data() {
    return {
      job: {
        title: '',
        level: '',
        description: ''
      }
    };
  },
  methods: {
    submitForm() {
      console.log('Dados do formulário:', this.job); //add ação de envio do form
    },
    cancelForm() {
      //inserir rota para retornar
    }
  }
};
</script>

<style scoped>
.n-layout-content {
  background-color: #efefef ;
}
.job-form {
  margin: 20px;
}
.form-group {
  margin-bottom: 20px;
  flex: 1;
}
.input-group {
  display: flex;
  justify-content: space-between;
}

label {
  display: block;
  font-weight: bold;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

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
