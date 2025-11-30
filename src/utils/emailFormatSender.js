const emailFormatSender = (lead) => {
  const from = '"Banking Sales" <no-reply@bankingsales.com>';
  const to = `${lead.email}`;
  const subject = 'Penawaran Khusus Deposito - Banking Sales';
  const text = 'Penawaran Deposito';
  const html = `
      <h3>Halo ${lead.name},</h3>
      <p>Kami memiliki penawaran spesial untuk produk deposito dengan bunga menarik khusus untuk Anda.</p>
      <p>Silakan hubungi kami untuk informasi lebih lanjut.</p>
      <br>
      <p>Salam,</p>
      <p>Tim Banking Sales</p>
    `;

  return {
    from,
    to,
    subject,
    text,
    html,
  };
};

module.exports = emailFormatSender;
