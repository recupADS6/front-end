import axios from "axios";

export async function getAllJobs() {
  try {
    const jobList =  await axios.get(`http://localhost:3000/jobsList`);
    return jobList;
  } catch (error) {
    console.error(error);
  }
}
