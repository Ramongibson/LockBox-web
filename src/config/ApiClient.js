import axios from 'axios';
import config from '../config';

const ApiClient = axios.create({
    baseURL: `${config.apiBaseUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default ApiClient;