const { telemetry } = require('../../util');

test('telemetry.execute correctly executes and collects latency data on an arbitrary async method', async () => {

   const timeout = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   const test_timeout = 1; // ms
   const test_return_value = 'data';
   const telemetry_response = await telemetry.execute(async () => { await timeout(test_timeout); return test_return_value; });

   expect(telemetry_response.data).toBeDefined();
   expect(telemetry_response.data).toEqual(test_return_value);

   verify_telemetry_metrics({ telemetry_response, test_timeout});
});

test('telemetry.execute correctly collects latency data and handles errors from an arbitrary async method', async () => {

   const timeout = (ms) => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   const test_timeout = 1; // ms
   const test_error_value = 'data';
   const telemetry_response = await telemetry.execute(async () => { await timeout(test_timeout); throw new Error(test_error_value); });

   expect(telemetry_response.errors).toBeDefined();
   expect(telemetry_response.errors).toEqual([test_error_value]);

   verify_telemetry_metrics({ telemetry_response, test_timeout});
});

const verify_telemetry_metrics = ({ telemetry_response, test_timeout }) => {
   expect(telemetry_response.telemetry).toBeDefined();
   const telemetry_data = telemetry_response.telemetry;
   const start = telemetry_data.start;
   const end = telemetry_data.end;
   expect(start <= end).toEqual(true);
   expect(telemetry_data.latency).toBeGreaterThanOrEqual(test_timeout);
};
