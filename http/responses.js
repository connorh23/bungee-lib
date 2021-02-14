
const HTTP_CODES = {
   OK: 200,
   CREATED: 201,
   BAD_REQUEST: 400,
   NOT_FOUND: 404,
   SERVER_ERROR: 500
};

const success = ({
  request,
  statusCode=HTTP_CODES.OK,
  headers={},
  body={},
  compress_output=false
}) => {
   return format_http_response({
      request,
      statusCode,
      headers,
      body,
      compress_output
   })
};

const error = ({
  request,
  statusCode=HTTP_CODES.SERVER_ERROR,
  headers={},
  errors=[],
  compress_output=false
}) => {
   return format_http_response({
      request,
      statusCode,
      headers,
      errors,
      compress_output
   })
};

/* ============================================================================================================== */
/* ============================================================================================================== */

const format_http_response = ({
   request,
   statusCode=HTTP_CODES.OK,
   headers={},
   body,
   errors,
   compress_output=false
}) => {

   headers = compress_output ?
      {
         ...headers,
         'Accept-Encoding': 'gzip',
         'x-accept-encoding': 'gzip'
      }
      : headers;

   return {
      ... request && { request },
      statusCode,
      headers,
      ...body && {
         body: JSON.stringify(body, null, 3)
      },
      ...errors && {
         body: JSON.stringify({ errors: errors }, null, 3)
      }
   }

}

module.exports = {
   success,
   error
};


