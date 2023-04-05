const express = require('express');
const { port, logs } = require('./config/config');
const cors = require('cors');
const { sequelize } = require('./src/db/sequelize');
const { ErrorController, HealthCheckController, loggerService } = require('../sample-service');
const libDbSchema = require('../lib-db-schemas');
// To initialize logger
loggerService.init({ logs });
// It will initializes models with connection instance
libDbSchema.init(sequelize);
const { urlencoded, json } = express;
const { logger } = loggerService;
const errorController = new ErrorController();
const { applyRoutes } = require('./src/routes');
const app = express();
app.disable('x-powered-by');
app.use(urlencoded({ limit: '50mb', extended: true }));
app.use(json({ type: 'text/plain', limit: '50mb' }));
app.use(json({ type: 'application/json', limit: '50mb' }));
app.use(cors());
app.use('/v1/healthcheck', new HealthCheckController().healthy());
//routes
app.use('/', applyRoutes(express.Router()));

// This will handle all unknown/undefined routes
app.use('*', errorController.notFound());
app.use(errorController.defaultErrorHandler());

const server = app.listen(port, () => {
   logger.info('server listen on port ' + port);
});

module.exports = { server, app };