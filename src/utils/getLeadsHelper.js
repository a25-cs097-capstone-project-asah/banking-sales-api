const InvariantError = require('../exceptions/InvariantError');
const {
  jobTranslation,
  maritalTranslation,
  educationTranslation,
  contactTranslation,
  monthTranslation,
  daysTranslation,
  poutcomeTranslation,
  yesNoTranslation,
  translateValue,
  categoryTranslation,
  statusTranslation,
} = require('./translations');

const verifySortOrder = (sortBy, order) => {
  const validSortBy = [
    'probability_score',
    'category',
    'status',
    'job',
    'name',
  ];
  const validOrder = ['DESC', 'ASC'];
  return {
    sortBy: validSortBy.includes(sortBy) ? sortBy : 'probability_score',
    order: validOrder.includes(order) ? order : 'DESC',
  };
};

const verifyStatus = (status) => {
  const validStatuses = [
    'new',
    'contacted',
    'follow-up',
    'converted',
    'rejected',
  ];
  if (!validStatuses.includes(status)) {
    throw new InvariantError(
      `Invalid status. Must be one of: ${validStatuses.join(', ')}`
    );
  }

  return {
    status,
    lastContactedAt: ['new', 'contacted', 'follow-up', 'converted'].includes(
      status
    )
      ? new Date().toISOString()
      : null,
  };
};

const leadFields = [
  'ID Lead',
  'Nama',
  'Email',
  'Lokasi',
  'Telepon',
  'Usia',
  'Pekerjaan',
  'Status Pernikahan',
  'Pendidikan',
  'Kredit',
  'Kepemilikan Rumah',
  'Pinjaman',
  'Saldo',
  'Metode Kontak',
  'Bulan',
  'Hari',
  'Durasi (detik)',
  'Kampanye',
  'Selang hari',
  'Kontak Sebelumnya',
  'Hasil kampanye',
  'Variasi pekerjaan',
  'Indeks Harga',
  'Indeks Kepercayaan',
  'Euribor 3 Bulan',
  'Jumlah Karyawan',
  'Skor Probabilitas (%)',
  'Hasil Prediksi',
  'Kategori',
  'Status',
  'Terakhir Dihubungi',
  'Dibuat pada',
];

const translatedLeads = (lead) => ({
  'ID Lead': lead.id,
  Nama: lead.name,
  Email: lead.email,
  Lokasi: lead.locate,
  Telepon: lead.phone,
  Usia: lead.age,
  Pekerjaan: translateValue(lead.job, jobTranslation),
  'Status Pernikahan': translateValue(lead.marital, maritalTranslation),
  Pendidikan: translateValue(lead.education, educationTranslation),
  Kredit: translateValue(lead.default, yesNoTranslation),
  'Kepemilikan Rumah': translateValue(lead.housing, yesNoTranslation),
  Pinjaman: translateValue(lead.loan, yesNoTranslation),
  Saldo: lead.balance,
  'Metode Kontak': translateValue(lead.contact, contactTranslation),
  Bulan: translateValue(lead.month, monthTranslation),
  Hari: translateValue(lead.day_of_week, daysTranslation),
  'Durasi (detik)': lead.duration,
  Kampanye: lead.campaign,
  'Selang hari': lead.pdays,
  'Kontak Sebelumnya': lead.previous,
  'Hasil kampanye': translateValue(lead.poutcome, poutcomeTranslation),
  'Variasi pekerjaan': lead.emp_var_rate,
  'Indeks Harga': lead.cons_price_idx,
  'Indeks Kepercayaan': lead.cons_conf_idx,
  'Euribor 3 Bulan': lead.euribor3m,
  'Jumlah Karyawan': lead.nr_employed,
  'Skor Probabilitas (%)': lead.probability_score,
  'Hasil Prediksi': lead.prediction_result,
  Kategori: translateValue(lead.category, categoryTranslation),
  Status: translateValue(lead.status, statusTranslation),
  'Terakhir Dihubungi': lead.last_contacted_at,
  'Dibuat pada': lead.created_at,
});

module.exports = { verifySortOrder, verifyStatus, leadFields, translatedLeads };
