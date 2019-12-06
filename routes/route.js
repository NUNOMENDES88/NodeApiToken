const jwtUtil = require('../utils/jwt.utils');
const bodyParser = require('body-parser');

const subscriptionsRoute =require('../routes/subscriptions.route');
const eventsRoute =require('../routes/events.route');
const usersRoute =require('../routes/users.route');
const loginRoute =require('../routes/login.route');

module.exports = function (app) 
{
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.use('/api/v1/login',loginRoute);
  app.use('/api/v1/subscriptions',jwtUtil.isLoggedIn,subscriptionsRoute);
  app.use('/api/v1/events',jwtUtil.isLoggedIn,eventsRoute);
  app.use('/api/v1/users',jwtUtil.isLoggedIn,usersRoute);
}