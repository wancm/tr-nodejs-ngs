/** cm:
 * when node execute a *.js file,
 * it does not just run the file as it is,
 * instead, it wrapped the content of the *.js file, into a function!
 *
 * Take this file as example, it will actually execute it as below
 */

// function() {exports, module, require, __filename, __dirname) {

/** cm:
 * therefore, keywords that we use like exports/module/require all the time,
 * it's not some globally available keyword that are out of the box, it's the first argument of the hidden wrapping function!
 * which is why, let say if you declare a variable like below, it's not a GLOBAL variable to all files!
 * it,s just local variable for this *.js file, or should, this scope
 * In other word, it's actually a func that are injected in by node.js!
 */

// code below will log all the arguments that are passed in to the hidden function, try it!
// console.log(arguments);

// cm: please be noted this is different on what a browser will do if you declare something like this
let g = 1; // g here only available in this scope

// codes below both do the same thing
exports.a = 42;
module.exports.b = 47;

/** cm:
 * And it always return the 'module.exports' from this function!
 * so, when any other .js file is 'require' on this file, it will export what's we put into the exports argument
 * try this on the 4-require.js in the same folder.
 */
//  return module.exports;
// } () <= execute the func
