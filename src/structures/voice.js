export default class Voice {
  constructor (opts) {
    this.options = opts.options || {
      mode: 'rtc',
      codec: 'vp8'
    }
    this.profile = opts.profile
    this.api = opts.client

    if (!window) {
      this.api.debug('Initiated voice client in non-browser environment and some functions may not work.')
    }
  }

  async initiate () {
    this.AgoraRTC = await import('agora-rtc-sdk-ng')
    this.client = new this.AgoraRTC(this.options)
  }

  async join (channelId, userId) {
    this.channel = await this.api.joinChannel({ channel: channelId })
    this.uid = await this.client.join(this.profile.agoraKey, channelId, this.channel.token, userId || this.profile.userId)
  }

  async leave () {
    await this.client.leave()

    this.uid = null
  }
}
