const http = require('http');
const url = require('url');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// an onRequest event to handle incoming http requests
const onRequest = (request, response) => {
  // parses the request url
  const parsedURL = url.parse(request.url);
};

// sets up the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
