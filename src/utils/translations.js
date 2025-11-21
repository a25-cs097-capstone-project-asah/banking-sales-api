const jobTranslation = {
  housemaid: 'Pengurus Rumah Tangga',
  services: 'Pelayanan/Jasa',
  'admin.': 'Administrasi',
  'blue-collar': 'Pekerja Lapangan',
  technician: 'Teknisi',
  retired: 'Pensiunan',
  management: 'Manajemen',
  unemployed: 'Tidak Bekerja',
  'self-employed': 'Wiraswasta',
  unknown: 'Tidak Diketahui',
  entrepreneur: 'Pengusaha',
};

const maritalTranslation = {
  single: 'Belum menikah',
  married: 'Menikah',
  divorced: 'Cerai',
};

const educationTranslation = {
  'basic.4y': 'SD tidak lulus',
  'basic.6y': 'SD',
  'basic.9y': 'SMP',
  'high.school': 'SMA',
  'professional.course': 'Diploma',
  'university.degree': 'Sarjana',
};

const contactTranslation = {
  telephone: 'telepon',
  cellular: 'seluler',
  unknown: 'tidak diketahui',
};

const monthTranslation = {
  jan: 'januari',
  feb: 'februari',
  mar: 'maret',
  apr: 'april',
  may: 'mei',
  jun: 'juni',
  jul: 'juli',
  aug: 'agustus',
  sep: 'september',
  oct: 'oktober',
  nov: 'november',
  dec: 'desember',
};

const daysTranslation = {
  mon: 'senin',
  tue: 'selasa',
  wed: 'rabu',
  thu: 'kamis',
  fri: 'jumat',
  sat: 'sabtu',
  sun: 'minggu',
};

const poutcomeTranslation = {
  success: 'sukses',
  failure: 'gagal',
  other: 'lainnya',
  unknown: 'tidak diketahui',
};

const categoryTranslation = {
  high: 'tinggi',
  medium: 'menengah',
  low: 'rendah',
};

const statusTranslation = {
  new: 'baru',
  contacted: 'dihubungi',
  'follow-up': 'tindak lanjut',
  converted: 'terkonversi',
  rejected: 'ditolak',
};

const yesNoTranslation = {
  yes: 'Ya',
  no: 'Tidak',
  unknown: 'Tidak diketahui',
};

const translateValue = (value, translationMap) => {
  if (!value) return value;
  const lowerValue = value.toString().toLowerCase();
  return translationMap[lowerValue] || value;
};

module.exports = {
  jobTranslation,
  maritalTranslation,
  educationTranslation,
  contactTranslation,
  monthTranslation,
  daysTranslation,
  poutcomeTranslation,
  categoryTranslation,
  statusTranslation,
  yesNoTranslation,
  translateValue,
};
