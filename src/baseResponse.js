const errorStruct = {
  200: {
    message: 'This is a successful response',
  },
  201: {
    message: 'Created successfully',
  },
  404: {
    id: 'notFound',
    message: 'The page you are looking for is not found.',
  },
};

const writeResponse = (response, errCode, content, type) => {
  response.writeHead(errCode, { 'Content-Type': type });
  response.write(content);
  return response.end();
};

const writeResponseHead = (response, errCode, type) => {
  response.writeHead(errCode, { 'Content-Type': type });
  return response.end();
};

const writeError = (response, errCode) => {
  const jsonObj = errorStruct[errCode];
  return writeResponse(response, errCode, JSON.stringify(jsonObj), 'application/json');
};

const writeErrorHead = (response, errCode) => writeResponseHead(response, errCode, 'application/json');
// export module
module.exports.writeResponse = writeResponse;
module.exports.writeResponseHead = writeResponseHead;
module.exports.writeError = writeError;
module.exports.writeErrorHead = writeErrorHead;
