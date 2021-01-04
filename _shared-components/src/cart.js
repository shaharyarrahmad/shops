module.exports = {
    cart: {
        activeOrder: {},
        setActiveOrder(order) {
            console.log('setting order', order)
            this.activeOrder = order;
        }
    }
}