const MongoLib = require("../lib/mongo");

class CardsService {
  constructor() {
    this.collection = "cards";
    this.mongoDB = new MongoLib();
  }

  async getCards(query) {
    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  async getCard(cardId) {
    const movie = await this.mongoDB.get(this.collection, cardId);
    return movie;
  }

  async createCard(card) {
    const createdCardId = await this.mongoDB.create(this.collection, card);
    return createdCardId;
  }

  async updateCard(cardId, updatedCard) {
    const updateCardId = await this.mongoDB.update(
      this.collection,
      cardId,
      updatedCard
    );
    return updateCardId;
  }

  async deleteCard(cardId) {
    const deletedCardId = await this.mongoDB.delete(this.collection, cardId);
    return deletedCardId;
  }
}

module.exports = CardsService;
