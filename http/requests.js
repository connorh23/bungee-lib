const axios = require('axios');
const { async_executor } = require('../util');

const get = async({ url, query_params, request_headers, num_retries }) => {
   return async_executor.execute({
      method: async () => {
         return axios.get(url, {
            ...query_params && {params: query_params},
            ...request_headers && {headers: request_headers},
         });
      },
      num_retries
   });
};

const post = async({ url, request_body={}, request_headers, num_retries }) => {
   return async_executor.execute({
      method: async () => {
         return axios.post(url, request_body, {
            ...request_headers && {headers: request_headers}
         });
      },
      num_retries
   });
};


const put = async({ url, request_body, request_headers, num_retries }) => {
   return async_executor.execute({
      method: async () => {
         return axios.put(url, request_body, {
            ...request_headers && {headers: request_headers}
         });
      },
      num_retries
   });
};

const destroy = async({ url, request_headers, num_retries }) => {
   return async_executor.execute({
      method: async () => {
         return axios.delete(url, {
            ...request_headers && { headers: request_headers },
         });
      },
      num_retries
   });
};

module.exports = {
   get,
   post,
   put,
   destroy
};




