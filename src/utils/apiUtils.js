import axios from 'axios';

export const get = (url, ...args) => {
    return new Promise((resolve) => {
        axios.get(url, {
            params: {
                ...args[0]
            }
        })
        .then(response => {
            resolve(response)
        })
    });
};