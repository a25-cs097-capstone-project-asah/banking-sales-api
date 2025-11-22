const jobTranslation = {
  housemaid: 'Ibu Rumah Tangga',
  services: 'Pelayanan/Jasa',
  'admin.': 'Administrasi',
  'blue-collar': 'Buruh',
  technician: 'Teknisi',
  retired: 'Pensiunan',
  management: 'Manajer',
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
  telephone: 'Telepon',
  cellular: 'Seluler',
  unknown: 'Tidak diketahui',
};

const monthTranslation = {
  jan: 'Januari',
  feb: 'Februari',
  mar: 'Maret',
  apr: 'April',
  may: 'Mei',
  jun: 'Juni',
  jul: 'Juli',
  aug: 'Agustus',
  sep: 'September',
  oct: 'Oktober',
  nov: 'November',
  dec: 'Desember',
};

const daysTranslation = {
  mon: 'Senin',
  tue: 'Selasa',
  wed: 'Rabu',
  thu: 'Kamis',
  fri: 'Jumat',
  sat: 'Sabtu',
  sun: 'Minggu',
};

const poutcomeTranslation = {
  success: 'Sukses',
  failure: 'Gagal',
  nonexistent: 'Belum pernah dihubungi',
};

const categoryTranslation = {
  high: 'Tinggi',
  medium: 'Sedang',
  low: 'Rendah',
};

const statusTranslation = {
  new: 'Baru',
  contacted: 'Dihubungi',
  'follow-up': 'Tindak lanjut',
  converted: 'Terkonversi',
  rejected: 'Ditolak',
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
