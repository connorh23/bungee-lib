# bungee-lib
```bungee-lib``` is a set of JavascriptUtilities for use within the Bungee ecosystem.  
They are intended to be low-level, syntactical aids which are decoupled from any other Bungee modules.

---
## Installation
``` 
npm install bungee-lib
```
---
## Usage Examples
The ```environment``` module allows ease-of-access to the local environment.
```javascript
// Load the environment module
const { environment } = require('bungee-lib');

// Easily set environment varaibles
environment.config({
    FOO: "bar"
});

// Access your .env as well as vars passed via .config() above
console.log(environment.vars.NODE_ENV); // development etc.
console.log(environment.vars.FOO);      // bar
```
TODO - add ```requests``` and ```responses``` documentation
