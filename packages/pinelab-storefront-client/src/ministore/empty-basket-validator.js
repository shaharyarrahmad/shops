module.exports = {
  async mounted() {
    this.$vendure.getActiveOrder().then((order) => {
      const hasLines = order && order.lines && order.lines && order.lines.length;
      if (!hasLines) {
        this.$router.push('/');
      }
    });
  }
};