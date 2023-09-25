import axios from "axios";

export async function getAllJobs() {
  try {
    const jobList =  await axios.get(`http://localhost:3000/jobsList`);
    return jobList.data;
  } catch (error) {
    console.error(error);
  }
}

export async function create(model) {
  try {
    const response = await axios.post(`http://localhost:3000/jobsList`, model);
    return response.data;
  } catch {
    console.log('Erro ao enviar requisição:');
  }
}
