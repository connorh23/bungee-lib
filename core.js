
const execute_with_retry = async (method, num_retries=3) => {
   let attempts = 0;
   let error;
   do {
      try {
         return await method();
      } catch (err) {
         error = err;
         console.log("Error, retrying");
         attempts += 1
      }
   } while (attempts < num_retries);
   throw error;
};

module.exports = {
   execute_with_retry
}
