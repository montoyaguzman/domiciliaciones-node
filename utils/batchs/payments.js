const config = require("../../config");
const PaymentsService = require("../../services/payments");

const paymentsService = new PaymentsService();

function startBatch() {
  setInterval(function() {
    verifyPayments();
  }, 500);
}

async function verifyPayments() {
  const datetime = new Date();
  const dayTime = datetime.getDate();

  try {
    const serviceResponse = await paymentsService.getPayments();
    const payments = Object.values(serviceResponse);
    pay(payments, dayTime);
  } catch (error) {
    console.log(error);
  }
}

function pay(payments, day) {
  console.log(payments);
  payments.forEach(async payment => {
    if (payment.paymentDate == day && payment.status == "activo") {
      payment.status = "Paid of";
      const serviceResponse = await paymentsService.updatePayment(
        payment._id,
        payment
      );
    }
  });
}

module.exports = startBatch;
