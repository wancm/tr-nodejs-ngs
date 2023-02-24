//
// Due to 'Node' is being block by an long for loop.
// therefore, the console.log will will have to wait until the for loop is finished
//
setTimeout(() => console.log("Hello after 0.5 seconds. MAYBE!"), 500);

// 1e10 <= this means 1 with 10 zeros behind
for (let i = 0; i < 1e10; i++) {
  // Block Node Synchronously
}
