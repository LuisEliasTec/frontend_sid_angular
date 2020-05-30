const test = {
  host: 'http://localhost',
  port: 8000
};

const root = '/api/v1';

export const config = {
  host: {
      test: `${test.host}:${test.port}${root}/`,
  }
};

// const socket = {
//   hostTest: 'http://localhost',
//   hostProd: 'http://localhost',
//   httpPort: 8150,
//   httpsPort: 8151
// };

// export const socketConfig = {
//   host: {
//       test: `${socket.hostTest}:${socket.httpPort}/`,
//       prod: `${socket.hostProd}:${socket.httpsPort}/`,
//   }
// };
