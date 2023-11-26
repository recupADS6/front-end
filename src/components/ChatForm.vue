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
        <n-button 
          class="upgrade-button" 
          color="#F2C94C"  
          text-color="#607004" 
          :loading="loadingUpgrade" 
          @click="sendDescription" 
          :disabled="model.jobDescription === ''" 
          icon-placement="left">
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
      <n-form-item-gi :span="24" path="kaa.knowledge">
        <n-input
          v-model:value="model.kaa.knowledge"
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
        @click="sendKnowledge" 
        :loading="loadingGenerateKnowledge"
        :disabled="model.kaa.knowledge !== ''"
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
        :loading="loadingUpgradeKnowledge"
        @click="sendUpgradeKnowledge"
        :disabled="model.kaa.knowledge === ''"
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
      <n-form-item-gi :span="24" path="kaa.ability">
        <n-input
          v-model:value="model.kaa.ability"
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
        @click="sendAbility" 
        :loading="loadingGenerateAbility" 
        :disabled="model.kaa.ability !== ''"
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
        :loading="loadingUpgradeAbility"
        @click="sendUpgradeAbility"
        icon-placement="left"
        :disabled="model.kaa.ability === ''"
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

      <n-form-item-gi :span="24" path="kaa.attitude">
        <n-input
          v-model:value="model.kaa.attitude"
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
        @click="sendAttitude" 
        :loading="loadingGenerateAttitude" 
        :disabled="model.kaa.attitude !== ''"
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
        :loading="loadingUpgradeAttitude"
        @click="sendUpgradeAttitude"
        icon-placement="left"
        :disabled="model.kaa.attitude === ''"
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
        type="error"
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
          type="warning"
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
    const knowledgeHistory = ref([]);
    const abilityHistory = ref([]);
    const attitudeHistory = ref([]);
    window.$message = useMessage()
    const message = useMessage();
    const formRef = ref(null);
    const chatMessages = ref([]);
    const userMessage = ref('');
    const loadingBar = useLoadingBar();
    const loadingUpgrade = ref(false);
    const loadingGenerateKnowledge = ref(false);
    const loadingGenerateAbility = ref(false);
    const loadingGenerateAttitude = ref(false);
    const loadingUpgradeKnowledge = ref(false)
    const loadingUpgradeAbility = ref(false)
    const loadingUpgradeAttitude = ref(false)
    const loadingGenerate = ref(false);
    const showModalSubmit = ref(false)
    const showModalCancel = ref(false);
    const jobId = ref('');
    const cargo = ref('');
    const knowledgeScraping = ref('');
    const abilityScraping = ref(''); 
    const attitudeScraping = ref(''); 
    const knowledgesScraping = ref([]);
    const abilitysScraping = ref([]);
    const attitudesScraping = ref([]);
    const knowledgesResult  = ref([]);
    const abilitysResult  = ref([]); 
    const attitudesResult = ref([]);
    const candidatoInfo = ref([]);
/*
    watch(jobDescription, async (newJobDescription) => {
      if (newJobDescription === '') {
        error.value = 'A Descrição da vaga não pode estar vazia para aprimorá-la!'
        console.log(error.value)
      } else {
        error.value = ''
      }
    }),

    watch(knowledge, async (newKnowledge) => {
      if (newKnowledge === '') {
        error.value = 'O Knowledge não pode estar vazio para aprimorá-lo!'
        console.log(error.value)
      } else {
        error.value = ''
      }
    }),

    watch(ability, (newAbility) => {
      if (newAbility === '') {
          error.value = 'A Habilidade não pode estar vazia para aprimorá-la!'
          console.log(error.value)
        } else {
          error.value = ''
        }
    });

    watch(attitude, (newAttitude) => {
      if (newAttitude === '') {
        error.value = 'A Atitude não pode estar vazia para aprimorá-la!'
        console.log(error.value)
      } else {
          error.value = ''
      }
    });
*/
    return {
      knowledgeHistory,
      abilityHistory,
      attitudeHistory,
      messageHistory,
      showModalCancel,
      showModalSubmit,
      loadingUpgrade,
      loadingGenerateKnowledge,
      loadingGenerateAbility,
      loadingGenerateAttitude,
      loadingUpgradeKnowledge,
      loadingUpgradeAbility,
      loadingUpgradeAttitude,
      loadingGenerate,
      loadingBar,
      chatMessages,
      userMessage,
      formRef,
      jobId,
      cargo,
      knowledgeScraping,
      abilityScraping,
      attitudeScraping,
      knowledgesScraping,
      abilitysScraping,
      attitudesScraping,
      knowledgesResult,
      abilitysResult,
      attitudesResult,
      candidatoInfo,
      model: ref({
        jobTitle: null,
        jobDescription: '',
        kaa:{
          knowledge:'',
          ability:'',
          attitude:''
        },
        jobLevel: null,
        jobStatus: null,
        rank: {
          id: null
        }
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

// ========================================================CONHECIMENTO=============================================
    async sendKnowledge () {
    this.loadingGenerateKnowledge = true; 
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


        await this.askKnowledgeToChat(userMessage);

        this.userMessage = '';

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askKnowledgeToChat(message) {
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
          const responseMessageKnowledge = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageKnowledge });

          this.generateKnowledge(responseMessageKnowledge);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateKnowledge=false;
      }
    },

    async generateKnowledge (responseMessageKnowledge){
      const knowledges = [""];
      const sections = responseMessageKnowledge.split('\n');

      try{
        for (const section of sections) {
          knowledges.push(section.trim());
        }

      this.model.kaa = {
      ...this.model.kaa, 
      knowledge: knowledges.join('\n')
      };

      console.log('Conhecimentos:', knowledges);

      }  catch(error) {
        console.log("Erro ao gerar Conhecimentos", error)
      }
    },

    //UPGRADE

    async sendUpgradeKnowledge () {
    this.loadingUpgradeKnowledge = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore os Conhecimentos com palavras completamente diferentes:
        ${this.model.kaa.knowledge},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';
         

         await this.askUpgradeKnowledgeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeKnowledgeToChat(message) {
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
          const responseMessageKnowledge = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageKnowledge });
          
        this.knowledgeHistory += `\n LOG:${responseMessageKnowledge}\n`;

        console.log(`HISTÓRICO CONHECIMENTO: ${this.knowledgeHistory}`);
        this.getUpgradeKnowledge(responseMessageKnowledge);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeKnowledge=false;
      }
    },

    async getUpgradeKnowledge (responseMessageKnowledge) {
      this.model.kaa.knowledge = responseMessageKnowledge;

      console.log("NEW CONHECIMENTO ", responseMessageKnowledge);
    },
// ========================================================CONHECIMENTO=============================================

// ========================================================HABILIDADE=============================================
    async sendAbility () {
    this.loadingGenerateAbility = true; 
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

        await this.askAbilityToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askAbilityToChat(message) {
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
          const responseMessageAbility = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAbility });

          this.generateAbility(responseMessageAbility);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateAbility=false;
      }
    },

    async generateAbility (responseMessageAbility){
      const abilitys = [""];
      const sections = responseMessageAbility.split('\n');

      try{
        for (const section of sections) {
          abilitys.push(section.trim());
        }

      console.log('Abilitys:', abilitys);

      this.model.kaa = {
      ...this.model.kaa,
      ability: abilitys.join('\n')
      };

      console.log("Habilidades", abilitys)

      }  catch(error) {
        console.log("Erro ao gerar Habilidades", error)
      }
    },
    
    //UPGRADE

    async sendUpgradeAbility () {
    this.loadingUpgradeAbility = true; 
      try {
        const userMessage = 
        `CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore as Habilidades com palavras completamente diferentes:
        ${this.model.kaa.ability},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

         await this.askUpgradeAbilityToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeAbilityToChat(message) {
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
          const responseMessageAbility = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAbility });
          
        this.abilityHistory += `\n LOG:${responseMessageAbility}\n`;

        console.log(`HISTÓRICO HABILIDADE: ${this.abilityHistory}`);
        this.getUpgradeAbility(responseMessageAbility);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeAbility=false;
      }
    },

    async getUpgradeAbility (responseMessageAbility){
      this.model.kaa.ability = responseMessageAbility;

      console.log("NEW HABILIDADE ", responseMessageAbility);
    },
// ========================================================HABILIDADE=============================================

// ========================================================ATITUDE=============================================
    async sendAttitude () {
    this.loadingGenerateAttitude = true; 
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

        await this.askAttitudeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askAttitudeToChat(message) {
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
          const responseMessageAttitude = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAttitude });

          this.generateAttitude(responseMessageAttitude);

        } else {
          console.error('Erro ao enviar mensagem para o backend:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } finally {
        this.loadingGenerateAttitude=false;
      }
    },

    async generateAttitude (responseMessageAttitude){
      const attitudes = [""];
      const sections = responseMessageAttitude.split('\n');

      try{
        for (const section of sections) {
          attitudes.push(section.trim());
        }

      console.log('Attitudes:', attitudes);

      this.model.kaa = {
      ...this.model.kaa,
      attitude: attitudes.join('\n')
      };

    console.log("attitudes", attitudes)

      }  catch {
    console.log("ERRO")
      }
    },

        //UPGRADE
    
    async sendUpgradeAttitude () {
    this.loadingUpgradeAttitude = true; 
      try {
        const userMessage = 
        `
        CHA é o acrônimo de conhecimento, habilidade e atitude, as três dimensões da definição de competência para um determinado cargo ou função.
        Seguindo a estrutura: 

        - item 1;
        - Item2.
        etc. 

        aprimore as Atitudes com palavras completamente diferentes:
        ${this.model.kaa.attitude},
        
        Da seguinte vaga: 
          ${this.model.jobTitle}, 
          ${this.model.jobLevel}, 
          ${this.model.jobDescription}`;

         this.userMessage = '';

         await this.askUpgradeAttitudeToChat(userMessage);

      } catch (error) {
        console.error('Erro ao enviar:', error);
      }
    },

    async askUpgradeAttitudeToChat(message) {
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
          const responseMessageAttitude = data.response;
          this.chatMessages.push({ role: 'AI', content: responseMessageAttitude });
          
        this.attitudeHistory += `\n LOG:${responseMessageAttitude}\n`;

        console.log(`HISTÓRICO ATITUDE: ${this.attitudeHistory}`);
        this.getUpgradeAttitude(responseMessageAttitude);

        } else {
          console.error('Erro ao enviar mensagem:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }  finally {
        this.loadingUpgradeAttitude=false;
      }
    },

    async getUpgradeAttitude (responseMessageAttitude){
      this.model.kaa.attitude = responseMessageAttitude;

      console.log("NEW ATITUDE ", responseMessageAttitude);
    },
// ========================================================ATITUDE=============================================
    async extractKAA(responseMessageKaa) {
    const knowledges = [""];
    const abilitys = [""];
    const attitudes = [""];
    const sections = responseMessageKaa.split('\n');



    let currentCategory = '';

    try{
    for (const section of sections) {
      if (section.startsWith('Conhecimentos:')) {
        currentCategory = 'knowledge';
      } else if (section.startsWith('Habilidades:')) {
        currentCategory = 'ability';
      } else if (section.startsWith('Atitudes:')) {
        currentCategory = 'attitude';
      } else {
        if (currentCategory === 'knowledge') {
          knowledges.push(section.trim());
        } else if (currentCategory === 'ability') {
          abilitys.push(section.trim());
        } else if (currentCategory === 'attitude') {
          attitudes.push(section.trim());
        }
      }
    }

    this.model.kaa = {
      knowledge: knowledges.join('\n'),
      ability: abilitys.join('\n'),
      attitude: attitudes.join('\n')
    };

    console.log("NOVO kaa", this.model.kaa)

  } catch {
    console.log("ERRO")
  }
    },
// cadastra o cha(um de cada vez) > cadastra os ids na tabela cha > obtem chaId 
    async sendServerResponseToBackend() {
      const requestBodyC = {
        content:  this.model.kaa.knowledge
      };
      const requestBodyH = {
        content:  this.model.kaa.ability
      };
      const requestBodyA = {
        content:  this.model.kaa.attitude
      };
      try{
        const respostaC = await axios.post(`${baseURL}/knowledge/add`, requestBodyC)
        const respostaH = await axios.post(`${baseURL}/ability/add`, requestBodyH)
        const respostaA = await axios.post(`${baseURL}/attitude/add`, requestBodyA)

        const knowledgeId = respostaC.data.id
        const abilityId = respostaH.data.id
        const attitudeId = respostaA.data.id

        const requestBodyKAA = {
          knowledge: { id: `${knowledgeId}` },
          ability: { id: `${abilityId}` },
          attitude: { id: `${attitudeId}` }
        };

        const respostaKaa = await axios.post(`${baseURL}/kaa/add`, requestBodyKAA)

        return respostaKaa.data.id;

      }catch(error ) {
          console.error('Erro ao enviar resposta do servidor para o backend:', error);
        }
    },
// enviar vaga backend 
    async sendJobToBackend(KaaId){
      try {
        const jobData = {
              jobTitle: this.model.jobTitle,
              jobDescription: this.model.jobDescription,
              jobLevel: this.model.jobLevel,
              jobStatus: this.model.jobStatus,
              kaa:{
                id: KaaId,
              },
              rank: null
            };
        const responseJob = await axios.post(`${baseURL}/job/add`, jobData);
        console.log('Resposta do servidor:', responseJob.data);

        this.jobId = responseJob.data.id;
        //console.log('ID do JOB: \n ', responseJob.data.id);

        window.$message.success('Vaga cadastrada com sucesso!');

        this.clearModel();

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao cadastrar a vaga. Tente novamente.');
      } finally {
        await this.getJobScraping(this.jobId);
      }
    },
// limpar model
    async clearModel (){
      this.model = {
              jobTitle: null,
              jobDescription: null,
              jobLevel: null,
              jobStatus: "",
              kaa: {
                knowledge: "",
                ability:"",
                attitude:""
              },
              rank : {
                id: null
              }
            };
    },
// chama o cadastro do cha > manda o chaId para cadastrar a vaga
    async submitForm(){
      try {  
      const KaaId = await this.sendServerResponseToBackend();
      await this.sendJobToBackend(KaaId);
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

      this.getJobScraping();

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

//============================================== SCRAPING =========================================================================

    async getJobScraping (jobId) {
      try {
        const responseJobGet = await axios.get(`${baseURL}/job/${jobId}`);
        //console.log('Resposta do servidor (JOB SCRAPING):', responseJobGet);

        const responseJobScraping = responseJobGet.data;

        console.log("RESPONSE JOB SCRAPING : \n", responseJobScraping);

        this.knowledgeScraping = responseJobScraping.kaa.knowledge;
        this.abilityScraping = responseJobScraping.kaa.ability;
        this.attitudeScraping = responseJobScraping.kaa.attitude;
        this.cargo = responseJobScraping.jobTitle;

        await this.sendMessage();

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao buscar candidatos! Tente novamente.');
      }

    },

    async sendMessage () { 
     //console.log(`PERGUNTA AO CHATGPT - SCRAPING (${this.cargo})${this.knowledge}, ${this.ability}, ${this.attitude}`)
      try {
        const userMessage = 
        `Poderia separar as palavras chaves separadamente de Conhecimento, Habilidades e Atitudes dessa vaga (${this.cargo}) :
          ${this.knowledgeScraping}, 
          ${this.abilityScraping}, 
          ${this.attitudeScraping},

          no seguinte formato:
          {"conhecimentos": ["palavra chave", "palavra chave" ...], "habilidades":  ["palavra chave", "palavra chave" ...], "atitudes": ["palavra chave", "palavra chave" ...]}
          `;

        await this.askToChat(userMessage);
        
        this.userMessage = '';

      } catch (error) {
        console.error('Erro ao enviar descrição:', error);
      }
    },

    async askToChat(message) {
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
          const responseMessage = data.response;

        //console.log("RESPOSTA CHATGPT : \n", responseMessage)

        const parsedResponse = JSON.parse(responseMessage);

        //console.log("RESPOSTA EM JSON : \n", parsedResponse )

        this.knowledgesResult = parsedResponse.knowledgesScraping;
        this.abilitysResult = parsedResponse.abilitysScraping;
        this.attitudesResult = parsedResponse.attitudesScraping;

        // formatação dos arrays como strings
        const knowledgesStr = JSON.stringify(this.knowledgesResult);
        const abilitysStr = JSON.stringify(this.abilitysResult);
        const attitudesStr = JSON.stringify(this.attitudesResult);

        this.getScraping(this.cargo, knowledgesStr, abilitysStr, attitudesStr);

        } else {
          console.error('Erro ao enviar mensagem para o backend(chat push):', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao enviar mensagem para o backend:', error);
      } 
    },

    async getScraping  (cargo,knowledgesStr,abilitysStr,attitudesStr) {
      try {
        const requestObject = {
          cargo: `${cargo}`,
          conhecimentos: `${knowledgesStr}`,
          habilidades: `${abilitysStr}`,
          atitudes: `${attitudesStr}`
        };

       // console.log(" REQUEST :", requestObject);

        const response = await fetch('http://localhost:7000/scraping', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify(requestObject),
        });

          const data = await response.json();
          console.log("ANTES DO JSON :\n", response);
          console.log("RESPONSE DATA SCRAPING: \n", data);
          const rank = JSON.stringify(data);
          console.log("STRING :", rank);
          
          this.candidatoInfo = data;

          console.log("CANDIDATOS:\n ", this.candidatoInfo);
          this.saveRank(data);
          
      } catch (error) {
        console.error('Erro ao enviar a requisição para o backend:', error);
      } finally {
        this.loadingScraping = false;
      }
    },

    async saveRank(candidatoInfo) {
      const requestBody = {
        value: candidatoInfo
      };
      console.log("REQUEST BODY: \n", requestBody)

      try {
        const responseRank = await axios.post(`${baseURL}/rank/add`, requestBody);
        console.log('Resposta do servidor:', responseRank.data);

        const match = responseRank.data.id;
        console.log(match)

        const responseMatch = await axios.get(`${baseURL}/rank/${match}`);
        console.log("TESTANDO RANK: \n", responseMatch)

        if (responseMatch.length > 0) {
          // Exibir a seção de candidatos apenas se houver candidatos no rank
          this.candidatos = responseMatch.data.value;
          window.$message.success('Rank salvo com sucesso!');
          await this.scrapingCompleted();
        } else {
        console.log("SEM CANDIDATOS COMPATÍVEIS \n", requestBody)
        window.$message.info('Sem candidatos compatíveis com a vaga!');
        }
      } catch (error) {
        console.error('Erro ao enviar a requisição para o backend:', error);
      }
    },

    
    async scrapingCompleted (jobId) {
      try {
        const scrapingData = {
            jobStatus: 'completed',
        };
        const responseScraping = await axios.put(`${baseURL}/job/${jobId}`, scrapingData);
        console.log('Resposta do servidor (SCRAPING):', responseScraping);

      } catch (error) {
        console.error('Erro ao enviar requisição:', error);
        window.$message.error('Erro ao buscar candidatos! Tente novamente.');
      }
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
  margin-bottom: -40px; 
  margin-top: -40px;
}
</style>
