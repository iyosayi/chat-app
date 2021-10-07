import { UniqueConstraintError } from "@shared/errors/ErrorClass";

export default class CreateChannelService {
  constructor({ channelRepository }) {
    this.channelRepository = channelRepository;
  }
  async execute({ name, description, createdBy }) {
    const exists = await this.channelRepository.findOne({ name });
    if(exists) throw new UniqueConstraintError('Channel with this name exists.')
    const channel = await this.channelRepository.insert({
      name,
      description,
      createdBy,
    });
    global.io.emit('channelCreated', channel)
    return channel
  }
}
