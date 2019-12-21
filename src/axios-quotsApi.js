import  axios from 'axios';
const  axiosQiotsApi = axios.create({
    baseURL: 'https://quote-95a45.firebaseio.com/'
});
export default axiosQiotsApi