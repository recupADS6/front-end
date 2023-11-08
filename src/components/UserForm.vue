<template>
    <div class="page-container no-header">
      <div class="left-half">
        <table>
         <tr>
          <img src="../assets/sign_in.svg" class="img-login" />
         </tr>
         <tr>
          <p class="welcome-text">Bem-Vindo(a)!</p>
         </tr>
        </table>
      </div>
      <div class="right-half">
        <n-card :content-style="customContentStyle">     
        <n-form>
            <h3>Realize seu cadastro</h3>
          <n-form-item-row label="Company">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Email">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="Password">
            <n-input       
            type="password"
            show-password-on="click"
            placeholder="Password"
            :maxlength="8" />

            <template #password-visible-icon>
                <n-icon :size="16" :component="GlassesOutline" />
            </template>
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          Sign up
        </n-button>
        </n-card>
      </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  import baseURL from '../services/chatService.js';
  import { GlassesOutline } from "@vicons/ionicons5";
  import { defineComponent } from "vue";

    export default defineComponent({
    setup() {
        return {
        GlassesOutline,
        };
    },
    data() {
        return {
        userData: {
            userName: '',
            userEmail: '',
            userPassword: '',
        },
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
            const response = await axios.post(`${baseURL}/user/add`, this.userData);
            console.log('Usuário registrado com sucesso', response.data);
        } catch (error) {
            console.error('Erro ao registrar o usuário', error);
        }
        }
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
  width:540px;
  height: 540px;
}
.welcome-text {
    font-size: 24px;
    text-align: center;
  }
</style>
  
  