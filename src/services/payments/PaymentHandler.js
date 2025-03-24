class PaymentHandler {
    async handler(order, payload) {
        throw new error("This method must be implemented");
    }
}

class CODPayment extends PaymentHandler {
    async handler(order, payload) {
        console.log("COD payment");
    }
}

class ZaloPayment extends PaymentHandler {
    async handler(order, payload) {
        console.log("Zalo payment");
    }
}