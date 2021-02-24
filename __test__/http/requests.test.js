const axios = require('axios');
const { requests } = require('../../http');

const MOCK_RETURN_VALUE = 'foo';
const TEST_URL = "http://foo.com";
const TEST_BODY = { key: 'val' };
const TEST_HEADERS = { auth: 'val' };

test('requests.get calls axios.get correctly', async () => {

   axios.get = jest.fn(async() => { return MOCK_RETURN_VALUE });

   const response = await requests.get({
      url: TEST_URL,
      query_params: TEST_BODY,
      request_headers: TEST_HEADERS
   });

   expect(axios.get).toHaveBeenCalledWith(TEST_URL, {
      params: TEST_BODY,
      headers: TEST_HEADERS
   });

   expect(response.response).toEqual(MOCK_RETURN_VALUE);
});

test('requests.post calls axios.post correctly', async () => {

   axios.post = jest.fn(async() => { return MOCK_RETURN_VALUE });

   const response = await requests.post({
      url: TEST_URL,
      request_body: TEST_BODY,
      request_headers: TEST_HEADERS
   });

   expect(axios.post).toHaveBeenCalledWith(TEST_URL, TEST_BODY, {
      headers: TEST_HEADERS
   });

   expect(response.response).toEqual(MOCK_RETURN_VALUE);

});

test('requests.put calls axios.put correctly', async () => {

   axios.put = jest.fn(async() => { return MOCK_RETURN_VALUE });

   const response = await requests.put({
      url: TEST_URL,
      request_body: TEST_BODY,
      request_headers: TEST_HEADERS
   });

   expect(axios.put).toHaveBeenCalledWith(TEST_URL, TEST_BODY, {
      headers: TEST_HEADERS
   });

   expect(response.response).toEqual(MOCK_RETURN_VALUE);

});

test('requests.destroy calls axios.delete correctly', async () => {

   axios.delete = jest.fn(async() => { return MOCK_RETURN_VALUE });

   const response = await requests.destroy({
      url: TEST_URL,
      request_headers: TEST_HEADERS
   });

   expect(axios.delete).toHaveBeenCalledWith(TEST_URL, {
      headers: TEST_HEADERS
   });

   expect(response.response).toEqual(MOCK_RETURN_VALUE);
});
