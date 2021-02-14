const requests = require('./http/requests');
const responses = require('./http/responses');

module.exports = {
   requests,
   responses
};

const test = async () => {

   let response = await requests.get({
      url: 'https://bg-data.tavour.com/rest/beers?page=1&pageSize=10'
   });

   console.log(response);
}

test();
