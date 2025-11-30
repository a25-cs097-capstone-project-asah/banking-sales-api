const amqp = require('amqplib');

class ProducerService {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async getConnection() {
    if (!this.connection) {
      try {
        this.connection = await amqp.connect(process.env.RABBITMQ_URL);
        
        this.connection.on('close', () => {
          console.warn('Producer: Koneksi terputus. Menghubungkan kembali...');
          this.connection = null;
          this.channel = null;
        });

        this.connection.on('error', (err) => {
          console.error('Producer: Koneksi error:', err);
          this.connection = null;
          this.channel = null;
        });
      } catch (error) {
        console.error('Producer: Gagal terkoneksi:', error);
        throw error;
      }
    }
    return this.connection;
  }

  async getChannel() {
    if (!this.channel) {
      const connection = await this.getConnection();
      this.channel = await connection.createChannel();
    }
    return this.channel;
  }

  async sendMessage(queue, message) {
    try {
      const channel = await this.getChannel();
      await channel.assertQueue(queue, { durable: true });
      channel.sendToQueue(queue, Buffer.from(message));
    } catch (error) {
      console.error('Producer: Gagal mengirim pesan:', error);
      throw error;
    }
  }
}

module.exports = new ProducerService();