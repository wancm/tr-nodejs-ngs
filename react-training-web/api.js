const express = require("express");
const bodyParser = require("body-parser");

// // https://www.javatpoint.com/expressjs-post
// // Create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// // https://codeforgeek.com/handle-get-post-request-express-4/
// app.use(bodyParser.urlencoded({ extended: false }));

// https://expressjs.com/en/resources/middleware/body-parser.html
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

/**
 * https://expressjs.com/en/guide/using-middleware.html#using-middleware
 * Middleware functions can perform the following tasks:
 *  - Execute any code.
 *  - Make changes to the request and the response objects.
 *  - End the request-response cycle.
 *  - Call the next middleware function in the stack.
 */

const middleware = {
  crossOrigin: (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type, Authorization"
    );
    next();
  },
  // https://www.javatpoint.com/expressjs-post
  // Create application/x-www-form-urlencoded parser
  urlencodedParser: bodyParser.urlencoded({ extended: false }),
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

const bids = [
  {
    houseId: 1,
    bidder: "John Doe",
    amount: 510000,
  },
];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/houses", [middleware.crossOrigin], async (req, res) => {
  await sleep(500);

  const houseArray = [
    {
      id: 1,
      address: "12 Valley Kings, Geneva",
      country: "Switzerland",
      price: 90000,
    },
    {
      id: 2,
      address: "89 Road of forks, Bern",
      country: "Switzerland",
      price: 50000,
    },
  ];

  res.send(houseArray);
});

app.get("/api/bids/:id", async (req, res) => {
  console.log("id:" + req.params.id);

  if (isNaN(req.params.id)) {
    res.status(400).send("Bad request");
    return;
  }

  res.send(bids.filter((b) => b.houseId === +req.params.id));
});

app.post("/api/bids", async (req, res) => {
  console.log(req.body);
  const bid = req.body;
  const found = bids.filter((b) => b.houseId === bid.houseId);

  if (found.length == 0) {
    bids.push(bid);
    res.status(200).send();
  } else {
    bids[0] = bid;
    res.status(201).send(`/api/bids/${bid.houseId}`);
  }
});

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

// Server setup
app.listen(3001, () => {
  console.log(`Server listening on http://localhost:3001`);
});

// https://stackoverflow.com/questions/14249506/how-can-i-wait-in-node-js-javascript-l-need-to-pause-for-a-period-of-time
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
