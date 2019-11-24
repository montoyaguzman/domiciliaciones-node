const MongoLib = require("../lib/mongo");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new MongoLib();
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection, {});
    return users || [];
  }

  async getUser(userId) {
    const user = await this.mongoDB.get(this.collection, userId);
    return user;
  }

  async createUser(user) {
    const createUserId = await this.mongoDB.create(this.collection, user);
    return createUserId;
  }
}

module.exports = UsersService;
