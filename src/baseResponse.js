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
  response.end();
};

const writeResponseHead = (response, errCode, type) => {
  response.writeHead(errCode, { 'Content-Type': type });
  response.end();
};

const writeError = (response, errCode, accept) => {
  const jsonObj = errorStruct[errCode];
  if (accept[0] === 'text/xml') {
    let xmlObj = '<response>';
    if (jsonObj.id) {
      xmlObj = `${xmlObj}<id>${jsonObj.id}</id>`;
    }
    xmlObj = `${xmlObj}<message>${jsonObj.message}</message>`;
    xmlObj = `${xmlObj}</response>`;

    writeResponse(response, errCode, xmlObj, accept[0]);
  } else {
    writeResponse(response, errCode, JSON.stringify(jsonObj), 'application/json');
  }
};

const writeErrorHead = (response, errCode, accept) => {
  if (accept[0] === 'text/xml') {
    writeResponseHead(response, errCode, accept[0]);
  } else {
    writeResponseHead(response, errCode, 'application/json');
  }
};

// export module
module.exports.writeResponse = writeResponse;
module.exports.writeResponseHead = writeResponseHead;
module.exports.writeError = writeError;
module.exports.writeErrorHead = writeErrorHead;
