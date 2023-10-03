const http = require('http');
const url = require('url');
const getUsers = require('./module/users');

const server = http.createServer((request, response) => {
  const queryObject = url.parse(request.url, true).query;

  if (request.url === '/?users') {
    response.status = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: application/json';
    response.write(getUsers());
    response.end();
    return;
  } else if ('hello' in queryObject) {
    if (!queryObject.hello) {
      response.status = 400;
      response.statusMessage = 'Bad Request';
      response.header = 'Content-Type: text/plain';
      response.write('Enter a name');
      response.end();
      return;
    } else {
      response.status = 200;
      response.statusMessage = 'OK';
      response.header = 'Content-Type: text/plain';
      response.write(`Hello, ${queryObject.hello}`);
      response.end();
      return;
    }
  } else if (request.url === '/') {
    response.status = 200;
    response.statusMessage = 'OK';
    response.header = 'Content-Type: text/plain';
    response.write('Hello, world!');
    response.end();
  } else {
    response.statusCode = 500;
    response.write('');
    response.end();
  }
});

server.listen(3003, () => {
  console.log('Сервер запущен по адресу http://127.0.0.1:3003');
});