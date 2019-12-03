const MongoLib = require("../lib/mongo");

class PaymentsService {
  constructor() {
    this.collection = "payments";
    this.mongoDB = new MongoLib();
  }

  async getPayments(query = {}) {
    const payments = await this.mongoDB.getAll(this.collection, query);
    return payments || [];
  }

  async getPayment(paymentId) {
    const payments = await this.mongoDB.get(this.collection, paymentId);
    return payments;
  }

  async createPayment(payment) {
    const createdPaymentId = await this.mongoDB.create(
      this.collection,
      payment
    );
    return createdPaymentId;
  }

  async updatePayment(paymentId, updatedPayment) {
    const updatePaymentId = await this.mongoDB.update(
      this.collection,
      paymentId,
      updatedPayment
    );
    return updatePaymentId;
  }

  async deletePayment(paymentId) {
    const deletePaymentId = await this.mongoDB.delete(
      this.collection,
      paymentId
    );
    return deletePaymentId;
  }
}

module.exports = PaymentsService;
