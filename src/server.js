const http = require('http');
const url = require('url');

const htmlHandler = require('./webResponse');
const userDataHandler = require('./userResponse');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// function pointer structs
const endpoints = {
  GET: {

  },
  HEAD: {

  },
  POST: {

  },
};
const notFound = htmlHandler.getNotFound;

// an onRequest event to handle incoming http requests
const onRequest = (request, response) => {
  // parses the request url
  const parsedURL = url.parse(request.url);

  const path = parsedURL.pathname;
  const requestMethod = response.method;

  let pageFound = false;

  if (endpoints[requestMethod]) {
    if (endpoints[requestMethod][path]) {
      pageFound = true;
      endpoints[requestMethod][path](request, response);
    }
  }

  if (!pageFound) {
    notFound(request, response);
  }
};

// sets up the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
