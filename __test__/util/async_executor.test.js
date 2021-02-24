const { async_executor } = require('../../util');

test("async_executor.execute returns the response of successful method invocation", async () => {

   const test_return_value = 'test';
   const test_method = jest.fn(async () => { return test_return_value });

   const response = await async_executor.execute_with_retry(test_method);
   expect(response).toEqual(test_return_value);

});

test("async_executor.execute retries failed method for specified number of retries", async () => {

   const test_method = jest.fn(async () => { throw new Error("error")});
   const num_retries = 5;

   let error_thrown = false;
   let response;
   try {
      await async_executor.execute_with_retry(test_method, num_retries);
   } catch (err) {
      error_thrown = true;
   }

   expect(error_thrown).toEqual(true);
   expect(response).toBeUndefined();
   expect(test_method).toHaveBeenCalledTimes(num_retries);

});

test("async_executor.execute retries defaults to 3 reties", async () => {

   const test_method = jest.fn(async () => { throw new Error("error")});

   let error_thrown = false;
   let response;
   try {
      await async_executor.execute_with_retry(test_method);
   } catch (err) {
      error_thrown = true;
   }

   expect(error_thrown).toEqual(true);
   expect(response).toBeUndefined();
   expect(test_method).toHaveBeenCalledTimes(3);

});
