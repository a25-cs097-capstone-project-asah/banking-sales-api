const app = require('./src/app');
const consumer = require('./src/queue/consumer');
const port = 5000;
const host = process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0';

app
  .listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
    consumer();
  })
  .on('error', (e) => {
    console.log('Server gagal dijalankan: ', e);
    process.exit(1);
  });
