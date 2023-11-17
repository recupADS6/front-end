<template>
    <div class="page-container no-header">
      <div class="left-half">
        <table>
         <tr>
          <td class="welcome-text">
          <img src="../assets/logo-recrutatech.svg" class="img-login" />
        </td>
         </tr>
         <tr>
          <td>
          <p class="welcome-text">Bem-Vindo(a)!</p>
          <p class="register-text">Participe da transformação digital do recrutamento! Registre-se agora para acessar nossa plataforma inovadora para a seleção de candidatos qualificados.</p>
        </td> 
        </tr>
        </table>
      </div>
      <div class="right-half">
        <n-card :content-style="customContentStyle">     
        <n-form
        ref="formRef"
        :rules="rules"
        :model="userData"
        >
            <h3>Realize seu cadastro</h3>
          <n-form-item-row label="Nome" label-style="color: white" path="userName">
            <n-input v-model:value="userData.userName" placeholder="Nome"/>
          </n-form-item-row>
          <n-form-item-row label="Email" label-style="color: white" path="email">
            <n-input v-model:value="userData.email" placeholder="E-mail"/>
          </n-form-item-row>
          <n-form-item-row label="Senha" label-style="color: white" path="password">
            <n-input     
            v-model:value="userData.password" 
            type="password"
            show-password-on="click"
            placeholder="Password"
            :maxlength="8" />
            <template #password-visible-icon>
                <n-icon :size="16" :component="GlassesOutline" />
            </template>
          </n-form-item-row>
        </n-form>

        <n-modal
          v-model:show="showModalSubmit"
          attr-type="submit"
          :mask-closable="false"
          preset="dialog"
          type="success"
          title="Confirmar Cadastro"
          content="Confirmar o cadastro do usuário?"
          positive-text="Confirmar"
          negative-text="Cancelar"
          @positive-click="registerUser()"
          @negative-click="cancelForm"
      />
        <n-button color="#27AE60" block strong type="submit" @click="handleValidateClick">
          Cadastrar
        </n-button>
        </n-card>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import baseURL from '../services/chatService.js';
  import { GlassesOutline } from "@vicons/ionicons5";
  import { defineComponent, ref } from "vue";
  import { useMessage } from 'naive-ui'
  

    export default defineComponent({
    setup() {
      const showModalSubmit = ref(false)
      const formRef = ref(null);
      window.$message = useMessage()
      const message = useMessage();
  
    return {
      GlassesOutline,
       showModalSubmit,
       formRef,
       userData: ref({
            userName: '',
            email: '',
            password: '',
            userRole: 'ROLE_USER',
        }),
       
       rules: {
        userName: [{ required: true, trigger: 'blur', message: 'Por favor, insira o nome do usuário', warningOnly: true, }],
        email: [{ required: true, trigger: 'change', message: 'Por favor, insira o e-mail!', warningOnly: true, }],
        password: [{ required: true, trigger: 'blur', message: 'Por favor, insira uma senha' , warningOnly: true,}]
       },
    
    async handleValidateClick(e) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
          if (!errors) {
            console.log("validado")
            showModalSubmit.value = true;
          } else {
            console.log(errors);
            message.error("Preencha os campos indicados!");
          }
        }).catch((error) => {
          console.error('Erro na validação:', error);
        });
      }, 

    };
    },

    data() {
        return {
        customContentStyle: {
            background: '#000000',
            fontSize: '24px', 
            color: 'white',
            margin: 'auto'
        },
        };
    },
    methods: {
        async registerUser() {
        try {
            const response = await axios.post(`${baseURL}/api/users`, this.userData);
            console.log('Usuário registrado com sucesso', response.data);
            this.showModalSubmit = false
            this.clearModel();
            window.$message.success('Usuário cadastrado com sucesso!');
        } catch (error) {
            console.error('Erro ao registrar o usuário', error);
            window.$message.error('Erro ao registrar o usuário');
        }
        },
        cancelSubmit () {
          this.showModalSubmit = false
        },
        // limpar model
        async clearModel (){
        this.userData = {
                userName: null,
                email: null,
                password: null,
              };
        },
        }
        })

</script>
  
<style scoped>
  .page-container {
    display: flex;
    width: 100%;
    height: 100vh;
  }
  
  .left-half {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
  .right-half {
    flex: 1;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .n-card {
    background-color: black;
    border: 0;
  }
  .img-login {
    width: 400px;
    height: 400px;
    margin-bottom: -50px;
  }
  .welcome-text {
    font-size: 24px;
    text-align: center;
  }
  .register-text {
    font-size: 20px;
    text-align: center;
  }
  n-form-item-row label{
    color:brown;
  }
</style>
  
  