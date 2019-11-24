const cardMocks = [
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b75e",
    cardNumber: "1234567891234567",
    expirationData: "01/99",
    cvv: "123"
  },
  {
    id: "d2a4a062-d256-41bb-b1b2-9d915af6b87d",
    cardNumber: "1234567891234568",
    expirationData: "01/99",
    cvv: "123"
  }
];

class cardsServiceMock {
  async createCard() {
    return Promise.resolve(cardMocks[0]);
  }
  async getCard() {
    return Promise.resolve(cardMocks[0]);
  }
  async updateCard() {
    return Promise.resolve(cardMocks[0]);
  }
  async deleteCard() {
    return Promise.resolve(cardMocks[0]);
  }
}

module.exports = { cardMocks, cardsServiceMock };
