const { redisClient } = require('../../config');

class CacheService {
  constructor() {
    this._client = redisClient;
    this._client.on('error', (error) => {
      console.error('Redis connection error:', error);
    });
  }

  async set(key, value, expirationInSecond = 3600) {
    await this._client.set(key, value, { EX: expirationInSecond });
  }

  async get(key) {
    return await this._client.get(key);
  }

  del(key) {
    this._client.del(key);
  }
}

module.exports = CacheService;
