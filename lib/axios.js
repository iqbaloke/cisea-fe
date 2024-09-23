import Axios from 'axios';

const axios = Axios.create({
    // baseURL: '/api',
    baseURL: 'http://localhost:3006',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

export default axios;