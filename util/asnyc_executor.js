
const execute = async ({ method, max_attempts = 0 }) => {

   let num_failed_attempts = 0;

   let error;
   let error_log;
   const tracker =  LatencyTracker.start();

   do {
      try {
         const response =  await method();
         tracker.end();
         return {
            data: response,
            ... (error_log) && { errors: error_log },
            telemetry: tracker.report(),
         }
      } catch (err) {
         num_failed_attempts += 1;
         tracker.lap({ message: `failed execution attempt (${num_failed_attempts})`});
         error = err;
         if (!error_log) error_log = [];
         error_log.push(err.message);
      }
   } while (num_failed_attempts < max_attempts);
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
