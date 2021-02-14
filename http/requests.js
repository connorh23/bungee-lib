const axios = require('axios');

const {
   async_executor
} = require('../util')

const get = async({ url, query_params, request_headers }) => {
   return async_executor.execute_with_retry(async () => {
      return axios.get(url, {
         ... query_params && { params: query_params },
         ... request_headers && { headers: request_headers },
      });
   });
};

const post = async({ url, request_body={}, request_headers }) => {
   return async_executor.execute_with_retry(async () => {
      return  axios.post(url, request_body, {
         ... request_headers && { headers: request_headers }
      });
   });
};

const put = async({ url, request_body, request_headers }) => {
   return async_executor.execute_with_retry(async () => {
      return axios.put(url, request_body, {
         ... request_headers && { headers: request_headers }
      });
   });
};

const destroy = async({ url, request_headers }) => {
   return async_executor.execute_with_retry(async () => {
      return axios.delete(url, {
         ...request_headers && { headers: request_headers },
      });
   });
};

module.exports = {
   get,
   post,
   put,
   destroy
};




