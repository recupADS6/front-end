import axios from "axios";

export async function getAllJobs() {
  try {
    const jobList =  await axios.get(`http://localhost:8090/job/`);
    return jobList.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getJobById(id) {
  try {
    const JobDetails =  await axios.get(`http://localhost:8090/job/${id}`);
    console.log("JOB DETAILS", JobDetails.data)
    return JobDetails.data;
  } catch (error) {
    console.error(error);
  }
}

export async function create(model) {
  try {
    const response = await axios.post(`http://localhost:8090/job/add`, model);
    return response.data;
  } catch {
    console.log('Erro ao enviar requisição:');
  }
}

export async function jobUpdate(id, model) {
  try {
    const response = await axios.put(`http://localhost:8090/job/${id}`, model);
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar requisição:', error);
    throw error;  // Re-throw the error to handle it further if needed
  }
}



export async function deleteJob(id) {
  try {
    const response = await axios.delete(`http://localhost:8090/job/${id}`);
    console.log("JOB DELETE", response.data)
    return response;
  } catch {
    console.log('Erro ao enviar requisição:');
  }
}
