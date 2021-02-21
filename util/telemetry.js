
const execute = async fn => {
   const tracker =  LatencyTracker.start();
   return new Promise((success) => {
      fn().then(data => {
         tracker.end();
         success({ telemetry: tracker.report(), data: data });
      }).catch(err => {
         tracker.end();
         success({ telemetry: tracker.report(), errors: [err.message] });
      })
   });
};

module.exports = {
   execute
};

// ===================================================================================================================

class LatencyTracker {

   start_time;
   end_time;
   latency;

   static start = () => {
      const tracker = new LatencyTracker();
      tracker.start_time = new Date();
      return tracker;
   };

   end = () => {
      this.end_time = new Date();
      this.latency = this.end_time.getTime() - this.start_time.getTime();
   };

   report = () => {
      return {
         start: this.start_time,
         end: this.end_time,
         latency: this.latency
      }
   }
}
