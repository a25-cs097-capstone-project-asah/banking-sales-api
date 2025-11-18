const app = require('./src/app');
const { port, host, env } = require('./src/config/server');

app
  .listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
    console.log(`Environment: ${env} `);
  })
  .on('error', (e) => {
    console.log('Server gagal dijalankan: ', e);
    process.exit(1);
  });
