const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "users";
    this.mongoDB = new MongoLib();
  }

  async getUsers() {
    const users = await this.mongoDB.getAll(this.collection, {});
    return users || [];
  }

  // async getUser(userId) {
  //   const user = await this.mongoDB.get(this.collection, userId);
  //   return user;
  // }
  async getUser(email) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser(user) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserId = await this.mongoDB.create(this.collection, {
      name,
      email,
      password: hashedPassword
    });
    return createUserId;
  }
}

module.exports = UsersService;
