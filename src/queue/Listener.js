class Listener {
  constructor(leadsService) {
    this._leadsService = leadsService;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { leadId, userId } = JSON.parse(message.content.toString());
      await this._leadsService.sendEmailToLead(leadId, userId);

      console.log(`Email berhasil dikirim`);
    } catch (error) {
      console.error('Email gagal diproses', error);
    }
  }
}

module.exports = Listener;