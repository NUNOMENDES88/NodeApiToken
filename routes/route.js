const jwtUtil = require('../utils/jwt.utils');
const bodyParser = require('body-parser');

const loginController = require('../controllers/login.controller');

const subscriptionsRoute =require('../routes/subscriptions.route');
const eventsRoute =require('../routes/events.route');
const usersRoute =require('../routes/users.route');
const loginRoute =require('../routes/login.route');

module.exports = function (api) 
{
  api.use(bodyParser.json({ limit: '100mb' }));
  api.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  api.use('/api/v1/login',loginRoute);

  api.use('/api/v1/subscriptions',jwtUtil.isLoggedIn,subscriptionsRoute);
  api.use('/api/v1/events',jwtUtil.isLoggedIn,eventsRoute);
  api.use('/api/v1/users',jwtUtil.isLoggedIn,usersRoute);

  api.get('/error',loginController.validLogin)
}