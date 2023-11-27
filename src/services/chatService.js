const axios = require('axios');

const baseURL = axios.defaults.baseURL = 'http://localhost:8090';

module.exports = baseURL;