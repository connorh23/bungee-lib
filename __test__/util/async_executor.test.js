const { async_executor } = require('../../util');

const timeout = async (ms) => {
   return new Promise(resolve => setTimeout(resolve, ms));
};
const TEST_TIMEOUT = 1;
const TEST_RETURN_VALUE = 'test';

test("async_executor.execute returns the response of successful method invocation with telemetry", async () => {

   const test_method = jest.fn(async () => {
      await timeout(TEST_TIMEOUT);
      return TEST_RETURN_VALUE
   });

   const response = await async_executor.execute({
      method: test_method,
      collect_telemetry: true,
      num_retries: 3
   });

   expect(response.response).toEqual(TEST_RETURN_VALUE);

   expect(response.telemetry).toBeDefined();
   verify_telemetry_metrics({ response, test_timeout: TEST_TIMEOUT });
});

test("async_executor.execute retries failed method for specified number of retries", async () => {

   const test_method = jest.fn(async () => { throw new Error("error")});
   const num_retries = 5;

   let error_thrown = false;
   let response;
   try {
      await async_executor.execute({
         method: test_method,
         num_retries
      });
   } catch (err) {
      error_thrown = true;
   }

   expect(error_thrown).toEqual(true);
   expect(response).toBeUndefined();
   expect(test_method).toHaveBeenCalledTimes(num_retries);
});

test("async_executor.execute defaults to 0 reties", async () => {

   const test_method = jest.fn(async () => { throw new Error("error")});

   let error_thrown = false;
   let response;
   try {
      await async_executor.execute({
         method: test_method
      });
   } catch (err) {
      error_thrown = true;
   }

   expect(error_thrown).toEqual(true);
   expect(response).toBeUndefined();
   expect(test_method).toHaveBeenCalledTimes(1);

});

const verify_telemetry_metrics = ({ response, test_timeout }) => {
   expect(response.telemetry).toBeDefined();
   const telemetry_data = response.telemetry;
   const start = telemetry_data.start;
   const end = telemetry_data.end;
   expect(start <= end).toEqual(true);
   expect(telemetry_data.latency).toBeGreaterThanOrEqual(test_timeout);
};
