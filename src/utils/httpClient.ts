import axios from "axios";

function addHeaderHttp() {
    // Add a request interceptor
    axios.interceptors.request.use(function (config) {
        config.headers.CMReq = "request";
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    // Add a response interceptor
    axios.interceptors.response.use(function (response) {
        response.headers.CMERes  = "response";
        return response;
    }, function (error) {
        return Promise.reject(error);
    });
}

export default addHeaderHttp;
