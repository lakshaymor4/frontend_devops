import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const userUrl = "/api/v1/users";

export const request = (method, url, data) => {

    return axios({
        method: method,
        url: url,
        data: data
    });
};

export const userRequest = (method, url, data) => {

    return axios({
        method: method,
        url: userUrl.concat(url != undefined ? url : ""),
        data: data
    });
};