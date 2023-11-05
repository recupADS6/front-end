<template>
  <n-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :show-label="true"
    :show-placeholder="false"
  >
    <n-grid :span="100" :x-gap="12">
      <n-form-item-gi :span="12" label="Título da Vaga" prop="jobTitle" path="jobTitle">
        <n-input v-model:value="model.jobTitle" placeholder="" />
      </n-form-item-gi>
      <n-form-item-gi :span="12" label="Nível da Vaga" prop="jobLevel" path="jobLevel">
        <n-select
          v-model:value="model.jobLevel"
          placeholder=""
          :options="selectOptions"
        />
      </n-form-item-gi>
      <n-form-item-gi class="text" :span="24" label="Descrição da Vaga" prop="jobDescription" path="jobDescription">
        <n-input
          v-model:value="model.jobDescription"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 20}"
        />
      </n-form-item-gi>
      <n-form-item-gi>
        <n-button class="upgrade-button" color="#F2C94C"  text-color="#607004" :loading="loadingUpgrade" @click="sendDescription" icon-placement="left">
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>
        Aprimorar Descrição
      </n-button>
      </n-form-item-gi>
      <n-form-item-gi class="label" :span="24">
      <div>
      Conhecimentos
      <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="16" color="#52A352">
          <info-icon />
        </n-icon>
      </template>
      <div class="large-text">
        Clique em "Gerar Conhecimentos" para que o ChatGPT gere conhecimentos para a vaga. Clique em aprimorar para melhorar.
      </div>
      </n-tooltip>
      </div>
      </n-form-item-gi>
      <n-form-item-gi :span="24" path="cha.conhecimento">
        <n-input
          v-model:value="model.cha.conhecimento"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
      <n-form-item-gi>
        <n-button-group class="buttons">
        <n-button 
        class="upgrade-button"
        color="#73A79A"  
        @click="sendConhecimento" 
        :loading="loadingGenerateConhecimento" 
        icon-placement="left">
        <template #icon>
          <n-icon>
            <wand-icon />
          </n-icon>
        </template>
        Gerar Conhecimentos
      </n-button>
      <n-button
        class="upgrade-button"
        color="#5380b8"
        text-color="white"
        :loading="loadingUpgradeConhecimento"
        @click="sendUpgradeConhecimento"
        icon-placement="left"
        >
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>
        Aprimorar Conhecimentos
        </n-button>
        </n-button-group>
      </n-form-item-gi>
      <n-form-item-gi class="label" :span="24">
      <div>
      Habilidades
      <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="16" color="#52A352">
          <info-icon />
        </n-icon>
      </template>
      <div class="large-text">
        Clique em "Gerar Habilidades" para que o ChatGPT gere habilidades para a vaga. Clique em aprimorar para melhorar.
      </div>
      </n-tooltip>
      </div>
      </n-form-item-gi>
      <n-form-item-gi :span="24" path="cha.habilidade">
        <n-input
          v-model:value="model.cha.habilidade"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
      <n-form-item-gi>
        <n-button-group>
        <n-button 
        class="upgrade-button"
        color="#73A79A"  
        @click="sendHabilidade" 
        :loading="loadingGenerateHabilidade" 
        icon-placement="left">
        <template #icon>
          <n-icon>
            <wand-icon />
          </n-icon>
        </template>
        Gerar Habilidades
      </n-button>
      <n-button
        class="upgrade-button"
        color="#5380b8"
        text-color="white"
        :loading="loadingUpgradeHabilidade"
        @click="sendUpgradeHabilidade"
        icon-placement="left"
        >
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>
        Aprimorar Habilidades
        </n-button>
        </n-button-group>
      </n-form-item-gi>


      <n-form-item-gi class="label" :span="24">
      <div>
      Atitudes
      <n-tooltip trigger="hover">
      <template #trigger>
        <n-icon size="16" color="#52A352">
          <info-icon />
        </n-icon>
      </template>
      <div class="large-text">
      Clique em "Gerar Atitudes" para que o ChatGPT gere atitudes para a vaga. Clique em aprimorar para melhorar.
      </div>
      </n-tooltip>
      </div>
      </n-form-item-gi>

      <n-form-item-gi :span="24" path="cha.atitude">
        <n-input
          v-model:value="model.cha.atitude"
          placeholder=""
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5 }"
        />
      </n-form-item-gi>
    <n-form-item-gi>
      <n-button-group>
        <n-button 
        class="upgrade-button"
        color="#73A79A"  
        @click="sendAtitude" 
        :loading="loadingGenerateAtitude" 
        icon-placement="left">
        <template #icon>
          <n-icon>
            <wand-icon />
          </n-icon>
        </template>
        Gerar Atitudes
      </n-button>
      <n-button
        class="upgrade-button"
        color="#5380b8"
        text-color="white"
        :loading="loadingUpgradeAtitude"
        @click="sendUpgradeAtitude"
        icon-placement="left"
        >
        <template #icon>
          <n-icon>
            <sparkles-icon />
          </n-icon>
        </template>
        Aprimorar Atitudes
        </n-button>
        </n-button-group>
      </n-form-item-gi>
    </n-grid>
    <div class="button-group">
      <n-modal
        v-model:show="showModalCancel"
        :mask-closable="false"
        preset="dialog"
        title="Cancelar"
        content="Tem certeza de que deseja cancelar? Todas as informações não salvas serão perdidas."
        positive-text="Confirmar"
        negative-text="Cancelar"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
      />
      <n-button color="#B04141"  @click="showModalCancel = true" icon-placement="left">
        <template #icon>
          <n-icon>
            <close-icon />
          </n-icon>
        </template>
        Cancelar
      </n-button>

      <n-modal
          v-model:show="showModalSubmit"
          attr-type="submit"
          :mask-closable="false"
          preset="dialog"
          title="Confirmar Cadastro"
          content="Confirmar o cadastro da vaga?"
          positive-text="Confirmar"
          negative-text="Cancelar"
          @positive-click="submitForm"
          @negative-click="cancelForm"
      />
      <n-button  color="#27AE60" type="submit" @click="handleValidateClick" icon-placement="left">
        <template #icon>
          <n-icon>
            <check-icon />
          </n-icon>
        </template>
        Cadastrar
      </n-button>
    </div>
  </n-form>
</template>

<script>
import { defineComponent, ref} from 'vue'
import { useMessage, useLoadingBar } from 'naive-ui'
import axios from 'axios';
import baseURL from '../services/chatService.js';
import { SparklesSharp as SparklesIcon, 
  ColorWand as WandIcon, 
  Close as CloseIcon,
  Checkmark as CheckIcon,
  InformationCircleSharp as InfoIcon } from "@vicons/ionicons5";

export default defineComponent({
  components: {
    SparklesIcon,
    WandIcon,
    CloseIcon,
    CheckIcon,
    InfoIcon
  },
  setup() {
    const messageHistory = ref('');   
    const conhecimentoHistory = ref([]);
    const habilidadeHistory = ref([]);
    const atitudeHistory = ref([]);
    window.$message = useMessage()
    const message = useMessage();
    const formRef = ref(null);
    const chatMessages = ref([]);
    const userMessage = ref('');
    const loadingBar = useLoadingBar();
    const loadingUpgrade = ref(false);
    const loadingGenerateConhecimento = ref(false);
    const loadingGenerateHabilidade = ref(false);
    const loadingGenerateAtitude = ref(false);
    const loadingUpgradeConhecimento = ref(false)
    const loadingUpgradeHabilidade = ref(false)
    const loadingUpgradeAtitude = ref(false)
    const loadingGenerate = ref(false);
    const showModalSubmit = ref(false)
    const showModalCancel = ref(false);

    return {
      conhecimentoHistory,
      habilidadeHistory,
      atitudeHistory,
      messageHistory,
      showModalCancel,
      showModalSubmit,
      loadingUpgrade,
      loadingGenerateConhecimento,
      loadingGenerateHabilidade,
      loadingGenerateAtitude,
      loadingUpgradeConhecimento,
      loadingUpgradeHabilidade,
      loadingUpgradeAtitude,
      loadingGenerate,
      loadingBar,
      chatMessages,
      userMessage,
      formRef,
      model: ref({
        jobTitle: null,
        jobDescription: null,
        cha:{
          conhecimento:null,
          habilidade:null,
          atitude:null
        },
        jobLevel: null,
        jobStatus: null,
      }),
      selectOptions: ['Júnior', 'Pleno', 'Sênior'].map((v) => ({
        label: v,
        value: v
      })),
      rules: {
        jobTitle: [
          { required: true, trigger: 'blur', message: 'Por favor, insira o título da vaga', warningOnly: true, }
        ],
        jobLevel: [
          { required: true, trigger: 'change', message: 'Por favor, selecione o nível da vaga', warningOnly: true, }
        ],
        jobDescription: [
          { required: true, trigger: 'blur', message: 'Por favor, insira a descrição da vaga' , warningOnly: true,}
        ]
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
  methods:{

   async sendDescription  () {
    this.loadingUpgrade = true; 
      try {
        const userMessage = `Aprimore a descrição da seguinte vaga, como um descrição comum de sites de emprego: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        this.askUpgradeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askUpgradeToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageDescription = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageDescription });
          
        this.messageHistory += `\n${responseMessageDescription}\n`;
        this.upgradeDescription(this.messageHistory);
        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgrade = false; 
      }
    },

    async upgradeDescription (messageHistory) {
      this.model.jobDescription = messageHistory;

      const requestBody = {
        content: this.model.jobDescription
      };
      console.log("NEW DESCRIPTION ", requestBody);
    },

    async sendMessage () {
      this.loadingGenerate = true;
      const userMessage = 
      `Seguindo a estrutura: 

      Conhecimentos:
      - item 1;
      - Item2.
      etc.

      Habilidades:
      - item 1;
      - Item2.
      etc.

      Atitudes:
      - item 1;
      - Item2.
      etc. 
      
    Escreva Conhecimentos, Habilidades e Atitudes da seguinte vaga: 
        ${this.model.jobTitle}, 
        ${this.model.jobLevel}, 
        ${this.model.jobDescription}`;

      const message = userMessage;
      this.chatMessages.push({ role: 'user', content: message });
      this.userMessage = '';

      this.askChaToChat(message);

    },

    async sendCha () {
    this.loadingUpgradeCha = true; 
      try {
        const userMessage = 
        `Seguindo a estrutura: 

        Conhecimentos:
        - item 1;
        - Item2.
        etc.

        Habilidades:
        - item 1;
        - Item2.
        etc.

        Atitudes:
        - item 1;
        - Item2.
        etc. 

        Aprimore os Conhecimentos, Habilidades e Atitudes com palavras completamente diferentes:
        ${this.model.cha.conhecimento},
        ${this.model.cha.habilidade},
        ${this.model.cha.atitude},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        this.askChaToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },
// ========================================================CONHECIMENTO=============================================
    async sendConhecimento () {
    this.loadingGenerateConhecimento = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

       gere os Conhecimentos da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;


        await this.askConhecimentoToChat(userMessage);

        this.userMessage = '';

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askConhecimentoToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageConhecimento = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageConhecimento });

          this.generateConhecimento(responseMessageConhecimento);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateConhecimento=false;
      }
    },

    async generateConhecimento (responseMessageConhecimento){
      const conhecimentos = [""];
      const sections = responseMessageConhecimento.split('\n');

      try{
        for (const section of sections) {
          conhecimentos.push(section.trim());
        }

      this.model.cha = {
        conhecimento: conhecimentos.join('\n')
      };

      console.log('Conhecimentos:', conhecimentos);

      }  catch(error) {
        console.log("Erro ao gerar Conhecimentos", error)
      }
    },

    //UPGRADE

    async sendUpgradeConhecimento () {
    this.loadingUpgradeConhecimento = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore os Conhecimentos com palavras completamente diferentes:
        ${this.model.cha.conhecimento},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';
         

         await this.askUpgradeConhecimentoToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeConhecimentoToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageConhecimento = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageConhecimento });
          
        this.conhecimentoHistory += `\n LOG:${responseMessageConhecimento}\n`;

        console.log(`HISTÓRICO CONHECIMENTO: ${this.conhecimentoHistory}`);
        this.getUpgradeConhecimento(responseMessageConhecimento);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeConhecimento=false;
      }
    },

    async getUpgradeConhecimento (responseMessageConhecimento) {
      this.model.cha.conhecimento = responseMessageConhecimento;

      console.log("NEW CONHECIMENTO ", responseMessageConhecimento);
    },
// ========================================================CONHECIMENTO=============================================

// ========================================================HABILIDADE=============================================
    async sendHabilidade () {
    this.loadingGenerateHabilidade = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

       gere as Habilidades da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        await this.askHabilidadeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askHabilidadeToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageHabilidade = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageHabilidade });

          this.generateHabilidade(responseMessageHabilidade);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateHabilidade=false;
      }
    },

    async generateHabilidade (responseMessageHabilidade){
      const habilidades = [""];
      const sections = responseMessageHabilidade.split('\n');

      try{
        for (const section of sections) {
          habilidades.push(section.trim());
        }

      console.log('Habilidades:', habilidades);

      this.model.cha = {
        habilidade: habilidades.join('\n')
      };

      console.log("Habilidades", habilidades)

      }  catch(error) {
        console.log("Erro ao gerar Habilidades", error)
      }
    },
    
    //UPGRADE

    async sendUpgradeHabilidade () {
    this.loadingUpgradeHabilidade = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore as Habilidades com palavras completamente diferentes:
        ${this.model.cha.habilidade},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

         await this.askUpgradeHabilidadeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeHabilidadeToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageHabilidade = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageHabilidade });
          
        this.habilidadeHistory += `\n LOG:${responseMessageHabilidade}\n`;

        console.log(`HISTÓRICO HABILIDADE: ${this.habilidadeHistory}`);
        this.getUpgradeHabilidade(responseMessageHabilidade);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeHabilidade=false;
      }
    },

    async getUpgradeHabilidade (responseMessageHabilidade){
      this.model.cha.habilidade = responseMessageHabilidade;

      console.log("NEW HABILIDADE ", responseMessageHabilidade);
    },
// ========================================================HABILIDADE=============================================

// ========================================================ATITUDE=============================================
    async sendAtitude () {
    this.loadingGenerateAtitude = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

       gere as Atitudes da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

        await this.askAtitudeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askAtitudeToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageAtitude = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAtitude });

          this.generateAtitude(responseMessageAtitude);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateAtitude=false;
      }
    },

    async generateAtitude (responseMessageAtitude){
      const atitudes = [""];
      const sections = responseMessageAtitude.split('\n');

      try{
        for (const section of sections) {
          atitudes.push(section.trim());
        }

      console.log('Atitudes:', atitudes);

      this.model.cha = {
        atitude: atitudes.join('\n')
      };

    console.log("atitudes", atitudes)

      }  catch {
    console.log("ERRO")
      }
    },

        //UPGRADE
    
    async sendUpgradeAtitude () {
    this.loadingUpgradeAtitude = true; 
      try {
        const userMessage = 
        `
        CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore as Atitudes com palavras completamente diferentes:
        ${this.model.cha.atitude},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

         await this.askUpgradeAtitudeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeAtitudeToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageAtitude = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAtitude });
          
        this.atitudeHistory += `\n LOG:${responseMessageAtitude}\n`;

        console.log(`HISTÓRICO ATITUDE: ${this.atitudeHistory}`);
        this.getUpgradeAtitude(responseMessageAtitude);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeAtitude=false;
      }
    },

    async getUpgradeAtitude (responseMessageAtitude){
      this.model.cha.atitude = responseMessageAtitude;

      console.log("NEW ATITUDE ", responseMessageAtitude);
    },
// ========================================================ATITUDE=============================================
    async askChaToChat(message) {
      try {
        const response = await fetch('http://localhost:5000/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user_message: message }),
        });

        if (response) {
          const data = await response.json();
          const responseMessageCha = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageCha });

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerate = false; 
        this.loadingUpgradeCha=false;
        this.loadingUpgradeConhecimento=false;
        this.loadingUpgradeHabilidade=false;
        this.loadingUpgradeAtitude=false;
      }
    },

    async extractCHA(responseMessageCha) {
    const conhecimentos = [""];
    const habilidades = [""];
    const atitudes = [""];
    const sections = responseMessageCha.split('\n');



    let currentCategory = '';

    try{
    for (const section of sections) {
      if (section.startsWith('Conhecimentos:')) {
        currentCategory = 'conhecimento';
      } else if (section.startsWith('Habilidades:')) {
        currentCategory = 'habilidade';
      } else if (section.startsWith('Atitudes:')) {
        currentCategory = 'atitude';
      } else {
        if (currentCategory === 'conhecimento') {
          conhecimentos.push(section.trim());
        } else if (currentCategory === 'habilidade') {
          habilidades.push(section.trim());
        } else if (currentCategory === 'atitude') {
          atitudes.push(section.trim());
        }
      }
    }

    console.log('Conhecimentos:', conhecimentos);
    console.log('Habilidades:', habilidades);
    console.log('Atitudes:', atitudes);

    this.model.cha = {
      conhecimento: conhecimentos.join('\n'),
      habilidade: habilidades.join('\n'),
      atitude: atitudes.join('\n')
    };

    console.log("NOVO cha", this.model.cha)

  } catch {
    console.log("ERRO")
  }
    },
// cadastra o cha(um de cada vez) > cadastra os ids na tabela cha > obtem chaId 
    async sendServerResponseToBackend() {
      const requestBodyC = {
        content:  this.model.cha.conhecimento
      };
      const requestBodyH = {
        content:  this.model.cha.habilidade
      };
      const requestBodyA = {
        content:  this.model.cha.atitude
      };
      try{
        const respostaC = await axios.post(`${baseURL}/con/add`, requestBodyC)
        const respostaH = await axios.post(`${baseURL}/hab/add`, requestBodyH)
        const respostaA = await axios.post(`${baseURL}/ati/add`, requestBodyA)

        const conhecimentoId = respostaC.data.id
        const habilidadeId = respostaH.data.id
        const atitudeId = respostaA.data.id

        const requestBodyCHA = {
          conhecimento: { id: `${conhecimentoId}` },
          habilidade: { id: `${habilidadeId}` },
          atitude: { id: `${atitudeId}` }
        };

        const respostaCha = await axios.post(`${baseURL}/cha/add`, requestBodyCHA)

        return respostaCha.data.id;

      }catch(error ) {
          console.error('Erro ao enviar resposta do servidor para o backend:', error);
        }
    },
// enviar vaga backend 
    async sendJobToBackend(chaId){
      try {
        const jobData = {
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              jobLevel: this.model.jobLevel,
              jobStatus: this.model.jobStatus,
              cha:{
                id: chaId,
              }
            };
        const responseJob = await axios.post(`${baseURL}/job/add`, jobData);
        console.log('Resposta do servidor:', responseJob.data);
        window.$message.success('Vaga cadastrada com sucesso!');

        this.clearModel();

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.');
      }
    },
// limpar model
    async clearModel (){
      this.model = {
              jobTitle: null,
              jobDescription: null,
              jobLevel: null,
              jobStatus: "",
              cha: {
                conhecimento: "",
                habilidade:"",
                atitude:"",
              },
            };
    },
// chama o cadastro do cha > manda o chaId para cadastrar a vaga
    async submitForm(){
      try {  
      const chaId = await this.sendServerResponseToBackend();
      await this.sendJobToBackend(chaId);
      this.showModalSubmit = false
      } catch (error) {
        console.error('Erro', error);
      }
    },

    cancelSubmit () {
      this.showModalSubmit = false
    },

    onPositiveClick () {
      this.clearModel();
      this.$router.push({ name: 'dashboard-page' });
      this.showModalCancel = false
      },
    onNegativeClick () {
      this.showModalCancel = false
    },

    cancelForm() {
      this.clearModel();
      this.$router.push({ name: 'dashboard-page' });
    },
  },
});
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
button{
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  margin-right: 10px;
}
.upgrade-button {
  margin-top: -50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.label {
  margin-bottom: -40px; /* Reduza a margem inferior entre os elementos do formulário */
  margin-top: -40px;
}
</style>
