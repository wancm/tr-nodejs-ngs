const repl = require("repl");

let r = repl.start({
  ignoreUndefined: true, // don't print undefined result
  replMode: repl.REPL_MODE_STRICT, // use strict mode
});

// load lodash to the global context
r.context.lodash = require("lodash");

console.log(process.env.USERNAME);
console.log(process.env.COMPUTERNAME);
