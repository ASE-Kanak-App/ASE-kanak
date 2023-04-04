import axios from 'axios';

//change if we go into production
//process.env.NODE_ENV  = 'development';
//const isProduction = () => process.env.NODE_ENV === 'production';
const isProduction = () => false;

const getDomain = () => isProduction() ? 'https://www.example.com' : 'http://127.0.0.1:5000';

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const handleError = error => {
    const response = error.response;

    if (response && !!`${response.status}`.match(/^4\d\d$/)) {
        return Promise.reject(response.data);
    }

}