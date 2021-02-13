
const HTTP_CODES = {
   OK: 200,
   CREATED: 201,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   SERVER_ERROR: 500
};

const success = ({ status=HTTP_CODES.OK, body={}, headers={}, compress_output=false }) => {
   if (compress_output) {
      headers = {
         ...headers,
         'Accept-Encoding': 'gzip',
         'x-accept-encoding': 'gzip'
      };
   }
   return {
      statusCode: status,
      headers: headers,
      body: JSON.stringify(body, null, 3)
   }
};

const error = ({ status_code=HTTP_CODES.SERVER_ERROR, errors=[], headers={}, compress_output=false }) => {
   if (compress_output) {
      headers = {
         ...headers,
         'Accept-Encoding': 'gzip',
         'x-accept-encoding': 'gzip'
      };
   }
   return {
      statusCode: status_code,
      headers: headers,
      body: JSON.stringify({ errors: errors }, null, 3)
   }
};

module.exports = {
   success,
   error
};
//    static load_query_param_from_event = (event, param, defaultValue) => {
//       if (event.queryStringParameters && event.queryStringParameters[param]) {
//          return this.#parse_parameter_types(event.queryStringParameters[param]);
//       }
//       if (defaultValue !== undefined) return defaultValue;
//       return undefined;
//    };
//
//    static load_path_param_from_event = (event, param, defaultValue) => {
//       if (event.pathParameters && event.pathParameters[param]) {
//          return this.#parse_parameter_types(event.pathParameters[param]);
//       }
//       if (defaultValue) {
//          return defaultValue;
//       }
//       return undefined;
//    };

