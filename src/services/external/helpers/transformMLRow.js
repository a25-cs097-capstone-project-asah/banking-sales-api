const { nanoid } = require('nanoid');
const {
  getPhone,
  getCategory,
  getBalance,
  getCreatedAt,
  dataCleaner,
  getContact,
  getEmailByName,
} = require('./functionHelper');

const transformRow = (row) => {
  const id = `leads-${nanoid(6)}`;
  const name = row.nama_klien;
  const email = getEmailByName(name);
  const locate = `${row.lokasi}, Indonesia`;
  const phone = getPhone(row.no_telp);
  const contact = getContact(phone);
  const probabilityScore = parseFloat(
    row.probabilitas_persen || row.probabilitas || 0
  );
  const balance = getBalance();
  const category = getCategory(probabilityScore);
  const createdAt = getCreatedAt();

  return {
    id,
    name: dataCleaner(name, 'unknown leads'),
    email,
    locate: dataCleaner(locate, 'unknown'),
    phone,
    age: parseInt(row.age) || 17,
    job: dataCleaner(row.job, 'entrepreneur'),
    marital: dataCleaner(row.marital, 'single'),
    education: dataCleaner(row.education, 'unknown'),
    default: dataCleaner(row.default, 'no'),
    housing: dataCleaner(row.housing, 'unknown'),
    loan: dataCleaner(row.loan, 'unknown'),
    balance,
    contact,
    month: dataCleaner(row.month, 'jan'),
    dayOfWeek: dataCleaner(row.day, 'mon'),
    duration: parseInt(row.duration) || 0,
    campaign: parseInt(row.campaign) || 0,
    pdays: parseInt(row.day_since_last_contact),
    previous: parseInt(row.previous) || 0,
    poutcome: dataCleaner(row.poutcome, 'unknown'),
    empVarRate: parseFloat(row.employment_variation_rate) || 0,
    consPriceIdx: parseFloat(row.consumer_price_index) || 0,
    consConfIdx: parseFloat(row.consumer_confidence_index) || 0,
    euribor3m: parseFloat(row.euribor_3m_rate) || 0,
    nrEmployed: parseFloat(row.number_of_employees) || 0,
    probabilityScore,
    predictionResult: dataCleaner(row.prediksi),
    category,
    status: 'new',
    lastContactedAt: null,
    createdAt,
  };
};

module.exports = transformRow;
