import userModel from "../models/user.model";

export default class UserRepository {
  async insert({ ...params }) {
    const user = await userModel.create({ ...params });
    return user;
  }

  async findOne(query) {
    return userModel.findOne(query)
  }

  async findById({ id }) {
    return userModel.findById(id);
  }

  async update({ id, ...params }) {
    return userModel.findOneAndUpdate({ _id: id }, { $set: { ...params } });
  }

  async findAll() {
    return userModel.find().select('-password')
  }
}
