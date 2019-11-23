const payments = [
  {
    idPayment: "2a4a062-d256-41bb-b1b2-9d915af6b12e",
    IdCard: "d2a4a062-d256-41bb-b1b2-9d915af6b87d",
    IdService: "2a4a062-d256-41bb-b1b2-9d915af6b12f",
    Name: "CFE",
    DateToPay: "12"
  }
];

class paymentsServiceMock {
  async createPayment() {
    return Promise.resolve(payments[0]);
  }
  async getPayment() {
    return Promise.resolve(payments[0]);
  }
  async updatePayment() {
    return Promise.resolve(payments[0]);
  }
  async deletePayment() {
    return Promise.resolve(payments[0]);
  }
}

module.exports = { paymentsServiceMock };
