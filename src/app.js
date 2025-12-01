const express = require('express');
const cors = require('cors');

// Import Routes
const authenticationRoutes = require('./api/authentications/routes');
const usersRoutes = require('./api/users/routes');
const leadsRouter = require('./api/leads/routes');
const dashboardRouter = require('./api/dashboard/routes');
const notesRouter = require('./api/notes/routes');
const historiesRouter = require('./api/histories/routes');
const healthRouter = require('./api/health');

// Import errorHandler
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/authentications', authenticationRoutes);
app.use('/users', usersRoutes);
app.use('/leads', leadsRouter);
app.use('/dashboard', dashboardRouter);
app.use('/histories', historiesRouter);
app.use('/', notesRouter);

// Health route
app.use('/health', healthRouter);

// errorHandler
app.use(errorHandler);

module.exports = app;
