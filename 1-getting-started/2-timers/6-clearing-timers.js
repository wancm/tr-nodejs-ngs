//
// code below will not be executed, due to the timeout is being cleared immediately after the code despite you are putting 0 milliseconds delay
//
const timerId = setTimeout(() => console.log("You will not see this one!"), 0);

// setImmediate <= alternate func for 0 milliseconds timeout without specifying the timeout milliseconds

clearTimeout(timerId);
// clearInterval
// clearImmediate

/************/
