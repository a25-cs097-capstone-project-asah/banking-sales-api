require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Routes
const authenticationRoutes = require('./src/api/authentications/routes');
const usersRoutes = require('./src/api/users/routes');
const leadsRouter = require('./src/api/leads/routes');

// Import errorHandler
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';
const environment = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server sedang berjalan',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/authentications', authenticationRoutes);
app.use('/users', usersRoutes);
app.use('/leads', leadsRouter);

// errorHandler
app.use(errorHandler);

app.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
  console.log(`Environment: ${environment} `);
});
