import channelsModels from "../models/channels.models";
import chatModel from "../models/chat.model";

export default class ChannelRepository {
  async insert({ ...params }) {
    const { createdBy } = params;
    const channel = await channelsModels.create({ ...params });
    channel.users.push(createdBy);
    await channel.save();
    return channel;
  }
  async findOne(query) {
    return channelsModels.findOne(query).lean();
  }

  async findById({ id }) {
    return channelsModels.findById(id).populate("users", "-password");
  }

  async findAll() {
    return channelsModels.find({}).populate("users", "-password");
  }

  async joinRoom({ channelId, userId }) {
    const channel = await channelsModels
      .findOne({
        _id: channelId,
      })
      .populate("users", "-password");
    
    if (channel && !channel.users.includes(userId)) {
      channel.users.addToSet(userId);
      await channel.save();
      const result = await channelsModels
        .findOne({ _id: channelId })
        .populate("users", "-password");
      return {
        isNew: false,
        channel: result,
      };
    }
    return {
      isNew: false,
      channel,
    };
  }

  async createChatMessage({ channelId, message, postedBy }) {
    try {
      const chat = await chatModel.create({
        message,
        postedBy,
        channelId,
        readRecipients: postedBy,
      });
      const aggregate = await chatModel.aggregate([
        // get post where _id = post._id
        { $match: { _id: chat._id } },
        // do a join on another table called users, and
        // get me a user whose _id = postedByUser
        {
          $lookup: {
            from: "users",
            localField: "postedBy",
            foreignField: "_id",
            as: "postedByUser",
          },
        },
        { $unwind: "$postedByUser" },
        // do a join on another table called chatrooms, and
        // get me a chatroom whose _id = chatRoomId
        {
          $lookup: {
            from: "channels",
            localField: "channelId",
            foreignField: "_id",
            as: "channelInfo",
          },
        },
        { $unwind: "$channelInfo" },
        { $unwind: "$channelInfo.users" },
        // do a join on another table called users, and
        // get me a user whose _id = userIds
        {
          $lookup: {
            from: "users",
            localField: "channelInfo.users",
            foreignField: "_id",
            as: "channelInfo.userProfile",
          },
        },
        { $unwind: "$channelInfo.userProfile" },
        // group data
        {
          $group: {
            _id: "$channelInfo._id",
            chatId: { $last: "$_id" },
            channelId: { $last: "$channelInfo._id" },
            message: { $last: "$message" },
            postedBy: { $last: "$postedByUser" },
            readRecipients: { $last: "$readRecipients" },
            channelInfo: { $addToSet: "$channelInfo.userProfile" },
            createdAt: { $last: "$createdAt" },
            updatedAt: { $last: "$updatedAt" },
          },
        },
      ]);
      return aggregate[0];
    } catch (error) {
      console.log("ERROR.AGGREGATE", error);
    }
  }

  async getAllMessages({ channelId }) {
    return chatModel.find({ channelId }).populate({
      path: "postedBy",
      model: "User",
      select: { password: 0 },
    });
  }
}
