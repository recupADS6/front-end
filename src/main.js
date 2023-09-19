import { createApp } from "vue";
import naive from "naive-ui";
import App from "./App.vue";
import axios from 'axios';

const baseURL = axios.defaults.baseURL = 'http://localhost:8090';

export default baseURL;

const app = createApp(App);

app.use(naive);

app.mount("#app");
