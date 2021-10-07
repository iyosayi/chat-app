export default class GetChannelService {
  constructor({ channelRepository }) {
    this.channelRepository = channelRepository;
  }
  async execute() {
    return this.channelRepository.findAll();
  }

  async getById({ id }) {
    return this.channelRepository.findById({ id });
  }

  async getChannelMessages({ channelId }) {
    return this.channelRepository.getAllMessages({ channelId });
  }
}
