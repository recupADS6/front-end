<template>
  <div>
    <header-bar></header-bar>
    <div class="job-form">
      <h1>Cadastro de Vagas</h1>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <input type="text" id="title" v-model="job.title" required  placeholder="Título da Vaga">
        </div>

        <div class="form-group">
          <select id="level" v-model="job.level" required>
            <option disabled selected value="">Nível</option>
            <option value="Junior">Junior</option>
            <option value="Pleno">Pleno</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div class="form-group">
          <textarea id="description" v-model="job.description" required placeholder="Descrição da Vaga"></textarea>
        </div>

        <div class="button-group">
          <button class="cancel-button" @click="cancelForm">Cancelar</button>
          <button class="register-button" type="submit">Cadastrar</button>
        </div>
        
      </form>
    </div>
  </div>
</template>

<script>
import HeaderBar from './HeaderBar.vue';

export default {
  components: {
    HeaderBar
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
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}

.register-button {
  background-color: #7ef0c0;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
