
const execute = async ({ method, num_retries=0 }) => {

   let num_failed_attempts = 0;

   let error;
   const errors = [];

   const tracker =  LatencyTracker.start();

   do {
      try {
         const response =  await method();
         tracker.end();
         return {
            response,
            errors,
            telemetry: tracker.report(),
            failed_attempts: errors.length
         }
      } catch (err) {
         num_failed_attempts += 1;
         tracker.lap({ message: `failed execution attempt (${num_failed_attempts})`});
         error = err;
         errors.push(err.message);
      }
   } while (num_failed_attempts <= num_retries);
   throw error;
};

module.exports = {
   execute
};

// ===================================================================================================================
// ===================================================================================================================
// ===================================================================================================================


class LatencyTracker {

   start_time;
   end_time;

   laps = [];

   static start = () => {
      const tracker = new LatencyTracker();
      tracker.start_time = new Date();
      return tracker;
   };

   lap = ({ message }) => {
      this.laps.push({
         message,
         time: new Date(),
         elapsed: this.elapsed()
      });
   };

   end = () => {
      this.end_time = new Date();
   };

   elapsed = () => {
      return (this.start_time) ? new Date().getTime() - this.start_time.getTime() : 0;
   };

   latency = () => {
      return (this.start_time && this.end_time) ?
         this.end_time.getTime() - this.start_time.getTime() :
         undefined;
   };

   report = () => {
      return {
         start: this.start_time,
         end: this.end_time,
         latency: this.latency(),
         laps: this.laps
      }
   }

}
