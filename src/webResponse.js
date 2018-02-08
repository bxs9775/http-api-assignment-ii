const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const baseResponse = require('./baseResponse.js');

const getIndex = (request, response) => baseResponse.writeResponse(response, 200, index, 'text/html');

const getCss = (request, response) => baseResponse.writeResponse(response, 200, css, 'text/css');

const getNotFound = (request, response) => {
  const accept = request.headers.accept.split(',');
  return baseResponse.writeError(response, 404, accept);
};

const getNotFoundHead = (request, response) => {
  const accept = request.headers.accept.split(',');
  return baseResponse.writeErrorHead(response, 404, accept);
};

// export module
module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getNotFound = getNotFound;
module.exports.getNotFoundHead = getNotFoundHead;
