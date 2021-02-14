const axios = import('axios');

const {
   execute_with_retry
} = import('./core.js');

const get = async({ url, query_params, request_headers }) => {
   return execute_with_retry(async () => {
      axios.get(url, {
         ... query_params && { params: query_params },
         ... request_headers && { headers: request_headers },
      });
   });
};

const post = async({ url, request_body={}, request_headers }) => {
   return execute_with_retry(async () => {
      axios.post(url, request_body, {
         ... request_headers && { headers: request_headers }
      });
   });
};

const put = async({ url, request_body, request_headers }) => {
   return execute_with_retry(async () => {
      axios.put(url, request_body, {
         ... request_headers && { headers: request_headers }
      });
   });
};

const destroy = async({ url, request_headers }) => {
   return execute_with_retry(async () => {
      return axios.delete(url, {
         ...request_headers && {headers: request_headers},
      });
   });
};

module.exports = {
   get,
   post,
   put,
   destroy
};




