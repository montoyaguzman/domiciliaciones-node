const userMock = [
  {
    idUser: "d2a4a062-d256-41bb-b1b2-9d915af6b32a",
    name: "Mario",
    lastName: "Salinas",
    email: "elmario@gmail.com",
    password: "1234",
    cards: [
      {
        id: "d2a4a062-d256-41bb-b1b2-9d915af6b87d",
        userId: "d2a4a062-d256-41bb-b1b2-9d915af6b21a",
        cardNumber: "1234567891234568",
        expirationData: "01/99",
        cvv: "123"
      }
    ],
    payments: [
      {
        idPayment: "2a4a062-d256-41bb-b1b2-9d915af6b12e",
        IdCard: "d2a4a062-d256-41bb-b1b2-9d915af6b87d",
        IdService: "2a4a062-d256-41bb-b1b2-9d915af6b12f",
        Name: "CFE",
        DateToPay: "12"
      }
    ]
  },
  {
    idUser: "d2a4a062-d256-41bb-b1b2-9d915af6b25a",
    name: "Jose",
    lastName: "Montoya",
    email: "eljose@gmail.com",
    password: "1234",
    cards: [],
    payments: []
  }
];

class usersServiceMock {
  async getUser() {
    return Promise.resolve(userMock[0]);
  }
  async createUser() {
    return Promise.resolve(userMock[1]);
  }
  async updateUser() {
    return Promise.resolve(userMock[1]);
  }
}

module.exports = { usersServiceMock };
