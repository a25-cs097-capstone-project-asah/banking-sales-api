require('dotenv').config();
const amqp = require('amqplib');
const { leadsService } = require('../services/postgre');
const Listener = require('./Listener');

const connect = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await connection.createChannel();

    connection.on('close', () => {
      console.error('Consumer: Koneksi terputus. Menghubungkan kembali...');
      setTimeout(connect, 5000);
    });

    connection.on('error', (err) => {
      console.error('Consumer: Koneksi error:', err);
    });

    await channel.assertQueue('email-queue', {
      durable: true,
    });

    const listener = new Listener(leadsService);
    
    channel.consume('email-queue', listener.listen, {
      noAck: true,
    });
  } catch (error) {
    console.error('Consumer: Gagal terkoneksi. Menghubungkan kembali...', error);
    setTimeout(connect, 5000);
  }
};

const consumer = async () => {
  connect();
};

if (require.main === module) {
  consumer();
}

module.exports = consumer;