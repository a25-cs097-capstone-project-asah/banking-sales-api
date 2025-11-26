const getEmailByName = (name) => {
  const cleaned = name.toLowerCase().replace(/[,.\s]/g, '');
  return `${cleaned}@example.com`;
};

const getPhone = (phone) => {
  const phoneRegex = /^(\+62\s?)?(\(0\d{2,3}\))[\s-]?\d{3,4}[\s-]?\d{3,4}$/;

  if (!phoneRegex.test(phone)) {
    return '+62 (852) 2936 1725';
  }

  return phone;
};

const getContact = (phone) => {
  if (/^\(0\d{2,3}\)/.test(phone)) {
    return 'telephone';
  }

  if (/^(\+62|62)/.test(phone)) {
    return 'cellular';
  }

  return 'unknown';
};

const getCategory = (probabilityScore) => {
  if (probabilityScore >= 80) return 'high';
  if (probabilityScore >= 60) return 'medium';
  return 'low';
};

const getBalance = () => {
  const min = 10000000;
  const max = 500000000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCreatedAt = () => {
  const now = new Date();
  const daysAgo = new Date(now.getTime() - 23 * 24 * 60 * 60 * 1000);

  const randomTime =
    daysAgo.getTime() + Math.random() * (now.getTime() - daysAgo.getTime());

  return new Date(randomTime).toISOString();
};

const dataCleaner = (value, defaultValue = null) => {
  if (!value || value === '' || value === 'unknown') return defaultValue;
  return value;
};

module.exports = {
  getEmailByName,
  getPhone,
  getContact,
  getCategory,
  getBalance,
  getCreatedAt,
  dataCleaner,
};
