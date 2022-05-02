const express = require('express');
const userRouter = require('./user.router');

function routerApi(app) {
  const router = express.Router();
  /* Endpoint estático: http://localhost:3977/api/v1 */
  app.use('/api/v1', router);
  /* Endpoint estático: http://localhost:3977/api/user */
  router.use('/users', userRouter);
 
}

module.exports = routerApi;