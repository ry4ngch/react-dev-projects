import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-80227-default-rtdb.asia-southeast1.firebasedatabase.app/'
});

export default instance;