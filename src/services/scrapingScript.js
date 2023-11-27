// scraping-script.js
const axios = require('axios');
const baseURL = require('./chatService.js');
const cron = require('node-cron');
const fetch = require('node-fetch');

async function getJobId() {
  try {
    const response = await axios.get(`${baseURL}/job/status/open`);
    const jobs = response.data;

    if (jobs && jobs.length > 0) {
      // Filtra apenas os trabalhos com status 'open'
      const openJobs = jobs.filter(job => job.jobStatus === 'open');
      
      if (openJobs.length > 0) {
        return openJobs;
      } else {
        console.log('Nenhum trabalho com status "open" disponível para scraping.');
        return null;
      }
    } else {
      console.log('Não há vagas disponíveis para scraping no momento.');
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar jobs para scraping:', error);
    return null;
  }
}
  
  async function getJobScraping(jobId) {
    console.log('Executando a tarefa cron GETJOBSCRAPING...');
    try {  
      if (jobId) {
        const responseJobData = await axios.get(`${baseURL}/job/${jobId}`);
        const responseJobScraping = responseJobData.data;
  
        console.log("RESPONSE JOB SCRAPING : \n", responseJobScraping);

      const knowledgeScraping = responseJobScraping.kaa.knowledge.content;
      const abilityScraping = responseJobScraping.kaa.ability.content;
      const attitudeScraping = responseJobScraping.kaa.attitude.content;
      const cargo = responseJobScraping.jobTitle;

      await sendMessage(jobId,cargo,knowledgeScraping,abilityScraping,attitudeScraping);
      }

    } catch (error) {
      console.error('Erro ao enviar requisição - GET JOB:', error);
    }
  }

  async function sendMessage (jobId,cargo,knowledgeScraping,abilityScraping,attitudeScraping) { 
    console.log('Executando a tarefa cron SEND MESSAGE...');
     try {
       const userMessage =
       `Poderia separar as palavras chaves separadamente de knowledge(Conhecimento), ability(Habilidades) e attitude(Atitudes) dessa vaga (${cargo}):
       Conhecimentos:
       ${knowledgeScraping},
       Habilidades:
       ${abilityScraping},
       Atitudes:
       ${attitudeScraping},
       no seguinte formato:
        {"conhecimentos": ["palavra chave", "palavra chave" ...], "habilidades":  ["palavra chave", "palavra chave" ...], "atitudes": ["palavra chave", "palavra chave" ...]}`;

        console.log("\n USER MESSAGE : \n", userMessage);
        await askToChat(jobId,userMessage, cargo);
       
     } catch (error) {
       console.error('Erro ao enviar descrição:', error);
     }
   }

   async function askToChat(jobId,userMessage, cargo) {
    console.log('Executando a tarefa cron ASKTOCHAT...');
    try {
      const response = await fetch('http://localhost:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: userMessage }),
      });

        const data = await response.json();
        const responseMessage = data.response;

        console.log("RESPOSTA CHATGPT - PALAVRAS-CHAVE: \n", responseMessage)

        const parsedResponse = JSON.parse(responseMessage);
        console.log("RESPOSTA EM JSON : \n", parsedResponse )

        const knowledgesResult = parsedResponse.conhecimentos;
        const abilitysResult = parsedResponse.habilidades;
        const attitudesResult = parsedResponse.atitudes;

        console.log("TESTE: ",knowledgesResult)

        // formatação dos arrays como strings
        const knowledgesStr = JSON.stringify(knowledgesResult);
        const abilitysStr = JSON.stringify(abilitysResult);
        const attitudesStr = JSON.stringify(attitudesResult);

        await getScraping(jobId,cargo, knowledgesStr, abilitysStr, attitudesStr);


    } catch (error) {
      console.error('Erro ao enviar mensagem para o backend:', error);
    } 
  }

  async function getScraping(jobId, cargo, knowledgesStr, abilitysStr, attitudesStr) {
    console.log('Executando a tarefa cron GETSCRAPING...', cargo);
    try {
      const requestObject = {
        cargo: cargo,
        conhecimentos: knowledgesStr,
        habilidades: abilitysStr,
        atitudes: attitudesStr
      };
  
      console.log(" DADOS PARA SCRAPING : \n", requestObject);
  
      const response = await fetch('http://localhost:7000/scraping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestObject),
      });
  
      console.log("ANTES DO JSON :\n", response);
  
      const candidatoInfo = await response.json();
      console.log("SCRAPING (JSON): \n", candidatoInfo);
  
      if (candidatoInfo.length === 0) {
        console.log("Sem candidatos compatíveis. Encerrando o processo.");
        return;  // Retorna sem salvar o rank se não houver candidatos
      }
  
      const rank = JSON.stringify(candidatoInfo);
      console.log("SCRAPING (STRING): \n", rank);
  
      console.log("SCRAPING CANDIDATO INFO: ", candidatoInfo);
  
      await saveRank(jobId, candidatoInfo);
      console.log("Rank salvo com sucesso.");
    } catch (error) {
      console.error('Erro ao enviar a requisição para o backend:', error);
    }
  }
  

  async function saveRank (jobId,candidatoInfo) {
    console.log('Executando a tarefa cron SAVERANK...');
    const requestBody = 
    {value: candidatoInfo
    };
    console.log("REQUEST BODY (RANK VALUE): \n", requestBody)

    try {
      const responseRank = await axios.post(`${baseURL}/rank/add`, requestBody);
      console.log('Resposta do servidor (RANK ADD): \n', responseRank.data);

      const match = responseRank.data.id;
      console.log("MATCH: \n ", match)

      await scrapingCompleted(jobId,match);

    } catch (error) {
      console.error('Erro ao enviar a requisição para o backend:', error);
    }
  }

  async function scrapingCompleted (jobId,match) {
    console.log('Executando a tarefa cron SCRAPINGCOMPLETED...', jobId, match);
    try {
      const scrapingData = {
          jobStatus: 'completed',
          rank: {
            id: match
          }
      };
      const responseScraping = await axios.put(`${baseURL}/job/${jobId}`, scrapingData);
      console.log('Resposta do servidor (SCRAPING):', responseScraping);

      console.log("\n \n ===================================== \n \n FIM \n \n ======================= \n \n")

    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  }

// scraping-script.js
let isScrapingRunning = false;

async function main() {
  try {
    console.log('Iniciando a função main...');

    cron.schedule('*/25 * * * * *', async () => {
      try {
        const jobs = await getJobId();
        console.log('Jobs obtidos:', jobs);

        if (jobs && jobs.length > 0 && !isScrapingRunning) {
          isScrapingRunning = true;
          console.log('Executando a tarefa cron...');
          try {
            for (const job of jobs) {
              const jobId = job.id;
              await getJobScraping(jobId);
              // await scrapingCompleted(jobId);
      
              console.log("JOB ID: ", jobId);
            }
            console.log('Tarefa cron concluída com sucesso.');
          } catch (error) {
            console.error('Erro durante o scraping:', error);
          } finally {
            isScrapingRunning = false;
          }
        } else {
          console.log('Nenhum trabalho disponível para scraping ou scraping em andamento.');
        }
      } catch (error) {
        console.error('Erro ao obter jobs:', error);
      }
    });

    console.log('Configuração da tarefa cron concluída.');
  } catch (error) {
    console.error('Erro na função main:', error);
  }
}

main();

  
  
